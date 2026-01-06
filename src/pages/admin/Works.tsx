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
import { Plus, Pencil, Trash2, X, Upload, Image, Layers, PenTool, Palette, Monitor, Camera, FileImage, Star, Sparkles } from "lucide-react";
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

const workTypes = [
  { id: "branding", name: "Branding", icon: Palette, color: "from-pink-500 to-rose-500" },
  { id: "ui-ux", name: "UI/UX Design", icon: Monitor, color: "from-blue-500 to-cyan-500" },
  { id: "illustration", name: "Illustration", icon: PenTool, color: "from-orange-500 to-amber-500" },
  { id: "print", name: "Print Design", icon: FileImage, color: "from-green-500 to-emerald-500" },
  { id: "photo", name: "Photography", icon: Camera, color: "from-purple-500 to-violet-500" },
  { id: "motion", name: "Motion Graphics", icon: Layers, color: "from-indigo-500 to-purple-500" },
];

export default function AdminWorks() {
  const [works, setWorks] = useState<Work[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWork, setEditingWork] = useState<Work | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [dragActive, setDragActive] = useState(false);
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
    setSelectedType("");
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

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file.",
        variant: "destructive",
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
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
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground flex items-center gap-3">
              <Sparkles className="text-primary" size={32} />
              Portfolio Works
            </h1>
            <p className="text-muted-foreground mt-2">Manage and showcase your creative projects</p>
          </div>
          <Button 
            onClick={() => openModal()}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all shadow-lg shadow-primary/25"
          >
            <Plus size={18} />
            Add New Work
          </Button>
        </div>

        {/* Work Type Quick Filters */}
        <div className="flex flex-wrap gap-3">
          {workTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(selectedType === type.id ? "" : type.id)}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-xl glass-card transition-all duration-300 hover:-translate-y-1",
                selectedType === type.id && "border-primary/50 shadow-lg shadow-primary/20"
              )}
            >
              <type.icon size={18} className={cn("bg-gradient-to-r bg-clip-text", type.color)} />
              <span className="text-sm font-medium">{type.name}</span>
            </button>
          ))}
        </div>

        {/* Works Gallery */}
        {isLoading ? (
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="break-inside-avoid">
                <div 
                  className="bg-muted/50 animate-pulse rounded-2xl" 
                  style={{ height: `${200 + (i % 3) * 100}px` }}
                />
              </div>
            ))}
          </div>
        ) : works.length === 0 ? (
          <Card variant="glass" className="p-16 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl glass-card mb-6">
              <Image size={40} className="text-muted-foreground" />
            </div>
            <h3 className="text-xl font-display font-semibold text-foreground mb-2">No works yet</h3>
            <p className="text-muted-foreground mb-6">Start building your portfolio by adding your first work.</p>
            <Button 
              onClick={() => openModal()}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
              <Plus size={18} />
              Add Your First Work
            </Button>
          </Card>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {works.map((work) => (
              <div 
                key={work.id} 
                className="break-inside-avoid group relative overflow-hidden rounded-2xl glass-card hover-lift cursor-pointer"
                onClick={() => openModal(work)}
              >
                <img
                  src={work.image_url}
                  alt={work.title}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="font-display font-bold text-foreground text-lg mb-1">
                    {work.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {categories.find((c) => c.id === work.category_id)?.name || "Uncategorized"}
                  </p>
                </div>
                
                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Button 
                    size="icon" 
                    variant="secondary"
                    className="glass-card hover:border-primary/50 h-9 w-9"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(work);
                    }}
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="glass-card hover:border-destructive/50 text-destructive h-9 w-9"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(work.id);
                    }}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
                
                {/* Featured Badge */}
                {work.is_featured && (
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-medium rounded-full shadow-lg">
                    <Star size={12} fill="currentColor" />
                    Featured
                  </span>
                )}
                
                {/* Featured Toggle */}
                <div 
                  className="absolute bottom-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Switch
                    checked={work.is_featured}
                    onCheckedChange={() => toggleFeatured(work.id, work.is_featured)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-xl flex items-center justify-center p-4">
          <Card variant="glass" className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 pb-4">
              <CardTitle className="flex items-center gap-2">
                {editingWork ? <Pencil size={20} className="text-primary" /> : <Plus size={20} className="text-primary" />}
                {editingWork ? "Edit Work" : "Add New Work"}
              </CardTitle>
              <Button size="icon" variant="ghost" onClick={closeModal} className="hover:bg-muted">
                <X size={18} />
              </Button>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Project Image</Label>
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={cn(
                      "relative border-2 border-dashed rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden",
                      dragActive 
                        ? "border-primary bg-primary/5" 
                        : "border-border/50 hover:border-primary/50",
                      imagePreview && "border-0 p-0"
                    )}
                    onClick={() => document.getElementById("image-upload")?.click()}
                  >
                    {imagePreview ? (
                      <div className="relative aspect-video">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-2xl"
                        />
                        <div className="absolute inset-0 bg-background/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                          <p className="text-sm font-medium">Click to change</p>
                        </div>
                      </div>
                    ) : (
                      <div className="py-12 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl glass-card mb-4">
                          <Upload className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <p className="text-foreground font-medium mb-1">Drop your image here</p>
                        <p className="text-sm text-muted-foreground">or click to browse</p>
                        <p className="text-xs text-muted-foreground mt-2">PNG, JPG, WEBP up to 10MB</p>
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

                {/* Work Type Selection */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Work Type</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {workTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => {
                          const cat = categories.find(c => c.slug === type.id || c.name.toLowerCase().includes(type.name.toLowerCase()));
                          if (cat) {
                            setFormData({ ...formData, category_id: cat.id });
                          }
                        }}
                        className={cn(
                          "flex items-center gap-2 p-3 rounded-xl glass-card transition-all duration-300 hover:-translate-y-1",
                          formData.category_id === categories.find(c => c.slug === type.id)?.id && "border-primary/50 shadow-lg shadow-primary/20"
                        )}
                      >
                        <div className={cn("p-2 rounded-lg bg-gradient-to-r", type.color)}>
                          <type.icon size={16} className="text-white" />
                        </div>
                        <span className="text-sm font-medium">{type.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="glass-card border-border/50 focus:border-primary/50"
                      placeholder="Project name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      value={formData.category_id}
                      onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                      className="w-full h-10 px-3 rounded-xl glass-card border border-border/50 text-foreground focus:border-primary/50 transition-colors"
                    >
                      <option value="">Select category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="glass-card border-border/50 focus:border-primary/50 resize-none min-h-[100px]"
                    placeholder="Describe your project..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="glass-card border-border/50 focus:border-primary/50"
                    placeholder="logo, branding, minimal (comma-separated)"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl glass-card">
                  <div className="flex items-center gap-3">
                    <Star size={20} className="text-primary" />
                    <div>
                      <Label htmlFor="featured" className="text-base font-medium cursor-pointer">Featured Work</Label>
                      <p className="text-sm text-muted-foreground">Show this work prominently on your portfolio</p>
                    </div>
                  </div>
                  <Switch
                    id="featured"
                    checked={formData.is_featured}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, is_featured: checked })
                    }
                  />
                </div>

                <div className="flex gap-3 pt-4 border-t border-border/50">
                  <Button type="button" variant="outline" onClick={closeModal} className="flex-1 glass-card border-border/50">
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : editingWork ? "Update Work" : "Add Work"}
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
