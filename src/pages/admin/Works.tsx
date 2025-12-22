import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X, Upload, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Work {
  id: string;
  title: string;
  description: string | null;
  category_id: string | null;
  image_url: string;
  tags: string[];
  is_featured: boolean;
  sort_order: number;
}

export default function AdminWorks() {
  const [works, setWorks] = useState<Work[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWork, setEditingWork] = useState<Work | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category_id: "",
    tags: "",
    is_featured: false,
  });

  const { toast } = useToast();

  const fetchData = async () => {
    try {
      const [worksResult, categoriesResult] = await Promise.all([
        supabase.from("portfolio_works").select("*").order("sort_order"),
        supabase.from("portfolio_categories").select("*").order("name"),
      ]);

      if (worksResult.data) setWorks(worksResult.data);
      if (categoriesResult.data) setCategories(categoriesResult.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category_id: "",
      tags: "",
      is_featured: false,
    });
    setImageFile(null);
    setImagePreview("");
    setEditingWork(null);
  };

  const openModal = (work?: Work) => {
    if (work) {
      setEditingWork(work);
      setFormData({
        title: work.title,
        description: work.description || "",
        category_id: work.category_id || "",
        tags: work.tags?.join(", ") || "",
        is_featured: work.is_featured,
      });
      setImagePreview(work.image_url);
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from("portfolio")
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from("portfolio")
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = editingWork?.image_url || "";

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      if (!imageUrl && !editingWork) {
        toast({
          title: "Image required",
          description: "Please upload an image for the portfolio work.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      const workData = {
        title: formData.title,
        description: formData.description || null,
        category_id: formData.category_id || null,
        tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
        is_featured: formData.is_featured,
        image_url: imageUrl,
      };

      if (editingWork) {
        const { error } = await supabase
          .from("portfolio_works")
          .update(workData)
          .eq("id", editingWork.id);

        if (error) throw error;

        toast({
          title: "Work updated",
          description: "Portfolio work has been updated successfully.",
        });
      } else {
        const { error } = await supabase
          .from("portfolio_works")
          .insert([{ ...workData, sort_order: works.length }]);

        if (error) throw error;

        toast({
          title: "Work added",
          description: "New portfolio work has been added successfully.",
        });
      }

      closeModal();
      fetchData();
    } catch (error: any) {
      console.error("Error saving work:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save portfolio work.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this work?")) return;

    try {
      const { error } = await supabase.from("portfolio_works").delete().eq("id", id);
      if (error) throw error;

      toast({
        title: "Work deleted",
        description: "Portfolio work has been deleted successfully.",
      });
      fetchData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete portfolio work.",
        variant: "destructive",
      });
    }
  };

  const toggleFeatured = async (id: string, currentValue: boolean) => {
    try {
      const { error } = await supabase
        .from("portfolio_works")
        .update({ is_featured: !currentValue })
        .eq("id", id);

      if (error) throw error;
      fetchData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update featured status.",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Portfolio Works</h1>
            <p className="text-muted-foreground mt-1">Manage your portfolio items</p>
          </div>
          <Button variant="gold" onClick={() => openModal()}>
            <Plus size={18} />
            Add Work
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} variant="glass" className="overflow-hidden">
                <div className="aspect-square bg-muted animate-pulse" />
                <CardContent className="p-4">
                  <div className="h-6 bg-muted animate-pulse rounded mb-2" />
                  <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : works.length === 0 ? (
          <Card variant="glass" className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No portfolio works yet.</p>
            <Button variant="gold" onClick={() => openModal()}>
              <Plus size={18} />
              Add Your First Work
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {works.map((work) => (
              <Card key={work.id} variant="glass" className="overflow-hidden group">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={work.image_url}
                    alt={work.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <Button size="icon" variant="glass" onClick={() => openModal(work)}>
                      <Pencil size={18} />
                    </Button>
                    <Button
                      size="icon"
                      variant="glass"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(work.id)}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                  {work.is_featured && (
                    <span className="absolute top-3 right-3 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
                      Featured
                    </span>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-semibold text-foreground truncate">
                        {work.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {categories.find((c) => c.id === work.category_id)?.name || "Uncategorized"}
                      </p>
                    </div>
                    <Switch
                      checked={work.is_featured}
                      onCheckedChange={() => toggleFeatured(work.id, work.is_featured)}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <Card variant="glass" className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{editingWork ? "Edit Work" : "Add New Work"}</CardTitle>
              <Button size="icon" variant="ghost" onClick={closeModal}>
                <X size={18} />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload */}
                <div className="space-y-2">
                  <Label>Image</Label>
                  <div
                    className={cn(
                      "border-2 border-dashed border-border/50 rounded-lg p-4 text-center cursor-pointer hover:border-primary/50 transition-colors",
                      imagePreview && "p-0 border-0"
                    )}
                    onClick={() => document.getElementById("image-upload")?.click()}
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full aspect-video object-cover rounded-lg"
                      />
                    ) : (
                      <div className="py-8">
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Click to upload image</p>
                      </div>
                    )}
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-card/60 border-border/50"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-card/60 border-border/50 resize-none"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg bg-card/60 border border-border/50 text-foreground"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="bg-card/60 border-border/50"
                    placeholder="logo, branding, minimal"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="featured">Featured</Label>
                  <Switch
                    id="featured"
                    checked={formData.is_featured}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, is_featured: checked })
                    }
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="ghost" onClick={closeModal} className="flex-1">
                    Cancel
                  </Button>
                  <Button type="submit" variant="gold" className="flex-1" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : editingWork ? "Update" : "Add Work"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </AdminLayout>
  );
}
