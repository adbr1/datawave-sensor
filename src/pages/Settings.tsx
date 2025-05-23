import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSettings } from "@/contexts/SettingsContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import MainLayout from "@/components/layout/MainLayout";
import { Bug, RefreshCw, BellRing, Globe, Bell, Gauge, Fish } from "lucide-react";
import { toast } from "sonner";
import SensorSettings from "@/components/settings/SensorSettings";
import FishMealsSettings from "@/components/settings/FishMealsSettings";
import { Button } from "@/components/ui/button";

const Settings = () => {
  const {
    settings,
    updateSettings,
    resetSettings
  } = useSettings();
  const [confirmReset, setConfirmReset] = useState(false);
  
  const handleReset = () => {
    if (confirmReset) {
      resetSettings();
      setConfirmReset(false);
    } else {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 3000);
      toast.warning("Cliquez à nouveau pour confirmer la réinitialisation", {
        description: "Cette action réinitialisera tous vos paramètres"
      });
    }
  };
  
  return <MainLayout title="Paramètres" className="max-w-4xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Paramètres</h1>
          <p className="text-muted-foreground">
            Configurez l'application selon vos préférences
          </p>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="connection">Connexion</TabsTrigger>
            <TabsTrigger value="display">Affichage</TabsTrigger>
            <TabsTrigger value="sensors">Capteurs</TabsTrigger>
            <TabsTrigger value="meals">Repas</TabsTrigger>
            <TabsTrigger value="advanced">Avancé</TabsTrigger>
          </TabsList>

          {/* Onglet Général */}
          <TabsContent value="general" className="space-y-4">
            <div className="rounded-lg border p-4 space-y-4">
              <h2 className="text-xl font-medium">Préférences générales</h2>
              
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <Label htmlFor="language">Langue</Label>
                <select id="language" className="ml-auto h-9 rounded-md border px-3" value={settings.language} onChange={e => updateSettings({
                language: e.target.value as "fr" | "en"
              })}>
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <BellRing className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <Label htmlFor="notifications">Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Recevoir des alertes pour les événements importants
                  </p>
                </div>
                <Switch id="notifications" checked={settings.notificationsEnabled} onCheckedChange={checked => updateSettings({
                notificationsEnabled: checked
              })} />
              </div>
            </div>
          </TabsContent>

          {/* Onglet Connexion */}
          <TabsContent value="connection" className="space-y-4">
            <div className="rounded-lg border p-4 space-y-4">
              <h2 className="text-xl font-medium">Paramètres de connexion</h2>
              
              <div className="space-y-2">
                <Label htmlFor="ipaddress">Adresse IP par défaut</Label>
                <Input id="ipaddress" type="text" placeholder="192.168.1.1" value={settings.lastIpAddress} onChange={e => updateSettings({
                lastIpAddress: e.target.value
              })} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="port">Port par défaut</Label>
                <Input id="port" type="text" placeholder="81" value={settings.lastPort} onChange={e => updateSettings({
                lastPort: e.target.value
              })} />
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <Label htmlFor="autoconnect">Connexion automatique</Label>
                  <p className="text-sm text-muted-foreground">
                    Connecter automatiquement au dernier appareil connu
                  </p>
                </div>
                <Switch id="autoconnect" checked={settings.bluetoothAutoConnect} onCheckedChange={checked => updateSettings({
                bluetoothAutoConnect: checked
              })} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeout">Délai de connexion (secondes)</Label>
                <Input id="timeout" type="number" min={5} max={120} value={settings.connectionTimeout} onChange={e => updateSettings({
                connectionTimeout: Number(e.target.value)
              })} />
              </div>
            </div>
          </TabsContent>

          {/* Onglet Affichage */}
          <TabsContent value="display" className="space-y-4">
            <div className="rounded-lg border p-4 space-y-4">
              <h2 className="text-xl font-medium">Préférences d'affichage</h2>
              
              <div className="space-y-2">
                <Label htmlFor="temperature-unit">Unité de température</Label>
                <select id="temperature-unit" className="w-full h-9 rounded-md border px-3" value={settings.temperatureUnit} onChange={e => updateSettings({
                temperatureUnit: e.target.value as "celsius" | "fahrenheit"
              })}>
                  <option value="celsius">Celsius (°C)</option>
                  <option value="fahrenheit">Fahrenheit (°F)</option>
                </select>
              </div>
            </div>
          </TabsContent>

          {/* Onglet Capteurs */}
          <TabsContent value="sensors" className="space-y-4">
            <div className="space-y-2 mb-4">
              <h2 className="text-xl font-medium">Configuration des capteurs</h2>
              <p className="text-muted-foreground">
                Configurez les seuils d'alerte et l'automatisation pour vos capteurs
              </p>
            </div>
            
            <SensorSettings />
          </TabsContent>

          {/* Nouvel onglet Repas */}
          <TabsContent value="meals" className="space-y-4">
            <div className="space-y-2 mb-4">
              <h2 className="text-xl font-medium">Repas des poissons</h2>
              <p className="text-muted-foreground">
                Configurez les horaires des repas quotidiens pour automatiser l'alimentation
              </p>
            </div>
            
            <FishMealsSettings />
          </TabsContent>

          {/* Onglet Avancé */}
          <TabsContent value="advanced" className="space-y-4">
            <div className="rounded-lg border p-4 space-y-4">
              <h2 className="text-xl font-medium">Paramètres avancés</h2>
              
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <Label htmlFor="dev-mode">Mode développeur</Label>
                  <p className="text-sm text-muted-foreground">
                    Activer les données simulées pour le développement
                  </p>
                </div>
                <Switch id="dev-mode" checked={settings.developerMode} onCheckedChange={checked => updateSettings({
                developerMode: checked
              })} />
              </div>

              <div className="flex items-center space-x-2">
                <RefreshCw className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <Label htmlFor="refresh-rate">Taux de rafraîchissement (ms)</Label>
                  <p className="text-sm text-muted-foreground">
                    Intervalle entre les mises à jour des données
                  </p>
                </div>
                <Input id="refresh-rate" type="number" className="w-24" min={100} max={10000} step={100} value={settings.refreshRate} onChange={e => updateSettings({
                refreshRate: Number(e.target.value)
              })} />
              </div>
            </div>

            <div className="rounded-lg border border-destructive/20 p-4 space-y-4">
              <h2 className="text-xl font-medium text-destructive">Zone de danger</h2>
              
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <Label htmlFor="reset">Réinitialiser les paramètres</Label>
                  <p className="text-sm text-muted-foreground">
                    Rétablir tous les paramètres par défaut
                  </p>
                </div>
                <button className={`px-4 py-2 rounded-md ${confirmReset ? 'bg-destructive text-destructive-foreground' : 'bg-muted hover:bg-muted-foreground/10'}`} onClick={handleReset}>
                  {confirmReset ? "Confirmer" : "Réinitialiser"}
                </button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>;
};

export default Settings;
