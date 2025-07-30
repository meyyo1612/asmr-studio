"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Square,
  Download,
  Mic,
  Volume2,
  Crown,
  Lock,
  Video,
  Lightbulb,
  MegaphoneIcon as Echo,
  Sparkles,
} from "lucide-react"

export default function ASMRStudio() {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [isPremium, setIsPremium] = useState(false)
  const [playingSounds, setPlayingSounds] = useState<Set<string>>(new Set())
  const [dimLights, setDimLights] = useState(false)

  const freeSounds = [
    { id: "whisper", name: "Gentle Whisper", icon: "🤫", description: "Close to ear" },
    { id: "cardboard-tapping", name: "Cardboard Tapping", icon: "📦", description: "Rhythmic tapping" },
    { id: "mic-brushing", name: "Mic Brushing", icon: "🎙️", description: "Soft brush" },
    { id: "nail-tapping", name: "Nail Tapping", icon: "💅", description: "On hard surface" },
    { id: "finger-tapping", name: "Finger Tapping", icon: "👆", description: "Various rhythms" },
    { id: "gentle-nails", name: "Gentle Nails", icon: "✨", description: "On wood & plastic" },
  ]

  const premiumSounds = [
    { id: "spraying", name: "Spray Bottle", icon: "💨", description: "Fine mist spray" },
    { id: "drops", name: "Water Drops", icon: "💧", description: "In quiet room" },
    { id: "slurping", name: "Gentle Sipping", icon: "👄", description: "Warm liquid" },
    { id: "rain", name: "Rain on Window", icon: "🌧️", description: "Cozy atmosphere" },
    { id: "fire", name: "Crackling Wood", icon: "🔥", description: "Fireplace sounds" },
    { id: "page-turning", name: "Page Turning", icon: "📖", description: "Old book" },
    { id: "mouth-sounds", name: "Mouth Sounds", icon: "👄", description: "Lip smacking & clicks" },
    { id: "eating", name: "Eating Sounds", icon: "🍯", description: "Honeycomb & crunchy" },
    { id: "hair-brushing", name: "Hair Brushing", icon: "💇", description: "Long gentle strokes" },
    { id: "fabric-sounds", name: "Fabric Sounds", icon: "🧵", description: "Silk & satin touching" },
    { id: "keyboard", name: "Keyboard Typing", icon: "⌨️", description: "Mechanical keys" },
    { id: "scissors", name: "Scissors Cutting", icon: "✂️", description: "Paper & fabric cuts" },
    { id: "bubble-wrap", name: "Bubble Wrap", icon: "🫧", description: "Gentle popping" },
    { id: "sand", name: "Sand Sounds", icon: "🏖️", description: "Kinetic sand play" },
  ]

  const toggleSound = (soundId: string) => {
    const newPlayingSounds = new Set(playingSounds)
    if (newPlayingSounds.has(soundId)) {
      newPlayingSounds.delete(soundId)
    } else {
      newPlayingSounds.add(soundId)
    }
    setPlayingSounds(newPlayingSounds)
  }

  const startRecording = () => {
    setIsRecording(true)
    setRecordingTime(0)
    // Simulate recording timer
    const timer = setInterval(() => {
      setRecordingTime((prev) => prev + 1)
    }, 1000)

    setTimeout(() => {
      clearInterval(timer)
    }, 1000)
  }

  const stopRecording = () => {
    setIsRecording(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${dimLights ? "bg-gray-900" : "bg-gradient-to-br from-amber-50 via-orange-50 to-red-50"}`}
    >
      <div className="max-w-md mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-amber-600 to-orange-700 rounded-full flex items-center justify-center shadow-lg">
              <div className="relative">
                <Sparkles className="w-5 h-5 text-amber-100" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
              </div>
            </div>
            <h1 className={`text-2xl font-bold ${dimLights ? "text-white" : "text-gray-800"}`}>ASMR Studio</h1>
          </div>
          <div className="flex items-center gap-2">
            {isPremium && <Crown className="w-5 h-5 text-yellow-500" />}
            <Badge variant={isPremium ? "default" : "secondary"}>{isPremium ? "Premium" : "Free"}</Badge>
          </div>
        </div>

        {/* Recording Status Bar */}
        {isRecording && (
          <Card className="mb-4 bg-red-50 border-red-200">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-700 font-medium">Recording</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-red-700 font-mono font-bold">{formatTime(recordingTime)}</span>
                  <Button size="sm" onClick={stopRecording} variant="outline" className="border-red-300 bg-transparent">
                    <Square className="w-3 h-3 mr-1" />
                    Stop
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="sounds" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sounds">Sounds</TabsTrigger>
            <TabsTrigger value="record">Record</TabsTrigger>
            <TabsTrigger value="premium">Premium</TabsTrigger>
          </TabsList>

          {/* Sounds Library */}
          <TabsContent value="sounds" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5" />
                  Free Sounds
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {freeSounds.map((sound) => (
                    <Button
                      key={sound.id}
                      variant={playingSounds.has(sound.id) ? "default" : "outline"}
                      onClick={() => toggleSound(sound.id)}
                      className={`justify-start h-auto p-3 ${
                        playingSounds.has(sound.id)
                          ? "bg-amber-500 hover:bg-amber-600 text-white"
                          : "bg-white/80 border-amber-200 hover:bg-amber-50"
                      }`}
                    >
                      <div className="flex flex-col items-start gap-1 w-full">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{sound.icon}</span>
                          <span className="font-medium text-sm">{sound.name}</span>
                        </div>
                        <span className="text-xs opacity-75">{sound.description}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-500" />
                  Premium Sounds
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {premiumSounds.map((sound) => (
                    <Button
                      key={sound.id}
                      variant={playingSounds.has(sound.id) ? "default" : "outline"}
                      disabled={!isPremium}
                      onClick={() => isPremium && toggleSound(sound.id)}
                      className={`justify-start h-auto p-3 ${
                        !isPremium
                          ? "opacity-60 bg-white/60 border-gray-200"
                          : playingSounds.has(sound.id)
                            ? "bg-amber-500 hover:bg-amber-600 text-white"
                            : "bg-white/80 border-amber-200 hover:bg-amber-50"
                      }`}
                    >
                      <div className="flex flex-col items-start gap-1 w-full">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{sound.icon}</span>
                          <span className="font-medium text-sm">{sound.name}</span>
                          {!isPremium && <Lock className="w-3 h-3 ml-auto" />}
                        </div>
                        <span className="text-xs opacity-75">{sound.description}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Active Sounds Display */}
            {playingSounds.size > 0 && (
              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800 text-sm">Active Sounds ({playingSounds.size})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(playingSounds).map((soundId) => {
                      const sound = [...freeSounds, ...premiumSounds].find((s) => s.id === soundId)
                      return (
                        <Badge key={soundId} variant="secondary" className="bg-green-100 text-green-800">
                          {sound?.icon} {sound?.name}
                        </Badge>
                      )
                    })}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setPlayingSounds(new Set())}
                    className="mt-3 w-full border-green-300 hover:bg-green-100"
                  >
                    Stop All Sounds
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Recording */}
          <TabsContent value="record" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic className="w-5 h-5" />
                  Audio Recording
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                    <Mic className={`w-16 h-16 text-white ${isRecording ? "animate-pulse" : ""}`} />
                  </div>
                  <p className="text-2xl font-mono font-bold mb-4">{formatTime(recordingTime)}</p>
                  <div className="flex justify-center gap-4">
                    {!isRecording ? (
                      <Button onClick={startRecording} size="lg" className="bg-red-500 hover:bg-red-600">
                        <Mic className="w-5 h-5 mr-2" />
                        Start Recording
                      </Button>
                    ) : (
                      <Button onClick={stopRecording} size="lg" variant="outline">
                        <Square className="w-5 h-5 mr-2" />
                        Stop Recording
                      </Button>
                    )}
                  </div>
                </div>

                {/* Voice Effects */}
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2 text-gray-700">
                    <Echo className="w-4 h-4" />
                    Voice Effects
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="justify-start bg-white/80 border-amber-200 hover:bg-amber-50">
                      Echo
                    </Button>
                    <Button variant="outline" className="justify-start bg-white/80 border-amber-200 hover:bg-amber-50">
                      Reverb
                    </Button>
                    <Button variant="outline" disabled={!isPremium} className="justify-start bg-transparent opacity-60">
                      Bass Filter {!isPremium && <Crown className="w-3 h-3 ml-1 text-yellow-500" />}
                    </Button>
                    <Button variant="outline" disabled={!isPremium} className="justify-start bg-transparent opacity-60">
                      High Pass {!isPremium && <Crown className="w-3 h-3 ml-1 text-yellow-500" />}
                    </Button>
                    <Button variant="outline" disabled={!isPremium} className="justify-start bg-transparent opacity-60">
                      3D Audio {!isPremium && <Crown className="w-3 h-3 ml-1 text-yellow-500" />}
                    </Button>
                    <Button variant="outline" disabled={!isPremium} className="justify-start bg-transparent opacity-60">
                      Binaural {!isPremium && <Crown className="w-3 h-3 ml-1 text-yellow-500" />}
                    </Button>
                    <Button variant="outline" disabled={!isPremium} className="justify-start bg-transparent opacity-60">
                      Whisper Enhance {!isPremium && <Crown className="w-3 h-3 ml-1 text-yellow-500" />}
                    </Button>
                    <Button variant="outline" disabled={!isPremium} className="justify-start bg-transparent opacity-60">
                      Noise Gate {!isPremium && <Crown className="w-3 h-3 ml-1 text-yellow-500" />}
                    </Button>
                  </div>
                </div>

                {/* Advanced Audio Tools - Premium */}
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2 text-gray-700">
                    <Volume2 className="w-4 h-4" />
                    Advanced Audio Tools
                    <Crown className="w-4 h-4 text-yellow-500" />
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    <Button variant="outline" disabled={!isPremium} className="justify-start bg-transparent opacity-60">
                      🎚️ Multi-track Layering {!isPremium && <Crown className="w-3 h-3 ml-1 text-yellow-500" />}
                    </Button>
                    <Button variant="outline" disabled={!isPremium} className="justify-start bg-transparent opacity-60">
                      🔄 Loop Station {!isPremium && <Crown className="w-3 h-3 ml-1 text-yellow-500" />}
                    </Button>
                    <Button variant="outline" disabled={!isPremium} className="justify-start bg-transparent opacity-60">
                      ⏱️ Trigger Sounds {!isPremium && <Crown className="w-3 h-3 ml-1 text-yellow-500" />}
                    </Button>
                    <Button variant="outline" disabled={!isPremium} className="justify-start bg-transparent opacity-60">
                      🎵 Background Ambience Mixer {!isPremium && <Crown className="w-3 h-3 ml-1 text-yellow-500" />}
                    </Button>
                  </div>
                </div>

                <Button className="w-full bg-transparent border-amber-200 hover:bg-amber-50" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Recording
                </Button>
              </CardContent>
            </Card>

            {/* Video Recording - Premium */}
            <Card className={!isPremium ? "opacity-60" : ""}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  Video Recording
                  {!isPremium && <Crown className="w-4 h-4 text-yellow-500" />}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button disabled={!isPremium} className="w-full">
                  <Video className="w-4 h-4 mr-2" />
                  {isPremium ? "Start Video Recording" : "Unlock with Premium"}
                </Button>
              </CardContent>
            </Card>

            {/* Lighting Control - Premium */}
            <Card className={!isPremium ? "opacity-60" : ""}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Lighting Control
                  {!isPremium && <Crown className="w-4 h-4 text-yellow-500" />}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  disabled={!isPremium}
                  className="w-full"
                  onClick={() => isPremium && setDimLights(!dimLights)}
                  variant={dimLights ? "default" : "outline"}
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  {dimLights ? "Turn On Lights" : "Dim Lights"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Premium */}
          <TabsContent value="premium" className="space-y-4">
            <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-800">
                  <Crown className="w-6 h-6" />
                  ASMR Studio Premium
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>14+ additional premium sounds</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Professional voice effects (3D, binaural)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Multi-track layering & loop station</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Video recording capability</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Advanced audio tools & triggers</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Lighting control for ambiance</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Background ambience mixer</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Ad-free experience</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Priority support</span>
                  </div>
                </div>

                <div className="text-center py-4">
                  <p className="text-3xl font-bold text-yellow-800">$8.99</p>
                  <p className="text-sm text-yellow-600">per month</p>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg"
                  onClick={() => setIsPremium(true)}
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade to Premium
                </Button>

                {isPremium && (
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-green-800 font-semibold">🎉 You are now a Premium user!</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Why Premium?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-600">
                <p>• Create professional-quality ASMR recordings</p>
                <p>• Access to exclusive sound library</p>
                <p>• Video functionality for YouTube and TikTok</p>
                <p>• Professional audio effects and filters</p>
                <p>• Enhanced ambiance controls</p>
                <p>• Priority customer support</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
