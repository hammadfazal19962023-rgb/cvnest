import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Save, FolderOpen, Trash2, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ManualProfile } from "@/components/ManualEntryStep";

interface SavedProfile {
  id: string;
  profile_name: string;
  name: string;
  email: string;
  phone: string;
  postcode: string;
  location: string;
  title: string;
  summary: string;
  experience: any[];
  education: any[];
  skills: string;
  certifications: string;
}

interface SavedProfilesPanelProps {
  currentProfile: ManualProfile;
  onLoadProfile: (profile: ManualProfile) => void;
}

const SavedProfilesPanel = ({ currentProfile, onLoadProfile }: SavedProfilesPanelProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<SavedProfile[]>([]);
  const [profileName, setProfileName] = useState("My Profile");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) fetchProfiles();
  }, [user]);

  const fetchProfiles = async () => {
    const { data, error } = await supabase
      .from("saved_profiles")
      .select("*")
      .order("updated_at", { ascending: false });
    if (!error && data) setProfiles(data as SavedProfile[]);
  };

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    const { error } = await supabase.from("saved_profiles").insert({
      user_id: user.id,
      profile_name: profileName,
      name: currentProfile.name,
      email: currentProfile.email,
      phone: currentProfile.phone,
      postcode: currentProfile.postcode,
      location: currentProfile.location,
      title: currentProfile.title,
      summary: currentProfile.summary,
      experience: currentProfile.experience,
      education: currentProfile.education,
      skills: currentProfile.skills,
      certifications: currentProfile.certifications,
    });
    setLoading(false);
    if (error) {
      toast.error("Failed to save profile");
    } else {
      toast.success("Profile saved!");
      fetchProfiles();
    }
  };

  const handleLoad = (p: SavedProfile) => {
    onLoadProfile({
      name: p.name,
      email: p.email,
      phone: p.phone,
      postcode: p.postcode,
      location: p.location,
      title: p.title,
      summary: p.summary,
      experience: p.experience || [],
      education: p.education || [],
      skills: p.skills,
      certifications: p.certifications,
    });
    toast.success(`Loaded "${p.profile_name}"`);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("saved_profiles").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete");
    } else {
      toast.success("Profile deleted");
      fetchProfiles();
    }
  };

  if (!user) {
    return (
      <div className="bg-card rounded-xl p-4 shadow-card text-center space-y-3 mb-6">
        <p className="text-sm text-muted-foreground">Sign in to save your details and reuse them for future CVs</p>
        <Button variant="outline" size="sm" onClick={() => navigate("/auth")}>
          <LogIn className="w-4 h-4 mr-1" /> Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl p-4 shadow-card space-y-4 mb-6">
      <h3 className="font-heading text-sm font-semibold text-foreground">Saved Profiles</h3>

      {/* Save current */}
      <div className="flex gap-2">
        <Input
          placeholder="Profile name"
          value={profileName}
          onChange={(e) => setProfileName(e.target.value)}
          className="text-sm"
        />
        <Button size="sm" onClick={handleSave} disabled={loading || !currentProfile.name.trim()}>
          <Save className="w-4 h-4 mr-1" /> Save
        </Button>
      </div>

      {/* List */}
      {profiles.length > 0 && (
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {profiles.map((p) => (
            <div key={p.id} className="flex items-center justify-between border border-border rounded-lg px-3 py-2">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{p.profile_name}</p>
                <p className="text-xs text-muted-foreground truncate">{p.name} · {p.email}</p>
              </div>
              <div className="flex gap-1 ml-2 shrink-0">
                <Button variant="ghost" size="sm" onClick={() => handleLoad(p)}>
                  <FolderOpen className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(p.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      {profiles.length === 0 && (
        <p className="text-xs text-muted-foreground text-center">No saved profiles yet</p>
      )}
    </div>
  );
};

export default SavedProfilesPanel;
