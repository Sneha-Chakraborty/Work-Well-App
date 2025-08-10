import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, ShieldAlert, CheckCircle2, Star } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";

interface AvailabilitySlot {
  date: string; // ISO date (YYYY-MM-DD)
  times: string[]; // 24h times like "09:00"
}

interface Therapist {
  id: string;
  name: string;
  title: string;
  specializations: string[];
  modalities: string[];
  languages: string[];
  price: number; // USD per session
  rating: number; // 0-5
  reviews: number;
  photo: string; // path to image
  availability: AvailabilitySlot[];
}

const THERAPISTS: Therapist[] = [
  {
    id: "t1",
    name: "Dr. Maya Patel, PhD",
    title: "Licensed Clinical Psychologist",
    specializations: ["Stress", "Anxiety", "Burnout"],
    modalities: ["CBT", "Mindfulness"],
    languages: ["English", "Hindi"],
    price: 120,
    rating: 4.9,
    reviews: 214,
    photo: "/placeholder.svg",
    availability: [
      { date: new Date().toISOString().slice(0, 10), times: ["09:00", "11:00", "16:00"] },
      { date: new Date(Date.now() + 86400000).toISOString().slice(0, 10), times: ["10:00", "14:00"] },
    ],
  },
  {
    id: "t2",
    name: "Alex Kim, LCSW",
    title: "Licensed Clinical Social Worker",
    specializations: ["Depression", "Work Stress", "Life Transitions"],
    modalities: ["ACT", "DBT"],
    languages: ["English", "Korean"],
    price: 95,
    rating: 4.7,
    reviews: 142,
    photo: "/placeholder.svg",
    availability: [
      { date: new Date().toISOString().slice(0, 10), times: ["13:00", "17:00"] },
      { date: new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10), times: ["09:30", "15:30"] },
    ],
  },
  {
    id: "t3",
    name: "Sofia García, LMFT",
    title: "Licensed Marriage & Family Therapist",
    specializations: ["Relationships", "Anxiety", "Boundaries"],
    modalities: ["Trauma-informed", "Mindfulness"],
    languages: ["English", "Spanish"],
    price: 110,
    rating: 4.8,
    reviews: 189,
    photo: "/placeholder.svg",
    availability: [
      { date: new Date().toISOString().slice(0, 10), times: ["08:30", "12:30"] },
      { date: new Date(Date.now() + 86400000).toISOString().slice(0, 10), times: ["09:00", "18:00"] },
    ],
  },
];

function useSEO() {
  useEffect(() => {
    const titleText = "Online Counseling for Stress & Anxiety | ZenithMind";
    document.title = titleText;

    const ensureTag = (selector: string, attrs: Record<string, string>) => {
      let el = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | HTMLScriptElement | null;
      if (!el) {
        const tag = (selector.match(/^[a-zA-Z0-9-]+/)?.[0] || 'meta') as keyof HTMLElementTagNameMap;
        el = document.createElement(tag) as any;
        document.head.appendChild(el);
      }
      Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
      return el;
    };

    const desc = ensureTag('meta[name="description"]', { name: 'description', content: 'Book compassionate online counseling for stress, anxiety, and burnout. Filter therapists by specialization, language, price, and availability.' });
    const canonicalHref = `${window.location.origin}/counseling`;
    const canonical = ensureTag('link[rel="canonical"]', { rel: 'canonical', href: canonicalHref });

    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How do I book a session?",
          acceptedAnswer: { "@type": "Answer", text: "Choose a therapist, pick an available time, and confirm your booking. You'll receive a confirmation on-screen." },
        },
        {
          "@type": "Question",
          name: "Do you offer sliding scale pricing?",
          acceptedAnswer: { "@type": "Answer", text: "Some therapists offer sliding scale rates depending on availability. Filter by price to find options within your budget." },
        },
        {
          "@type": "Question",
          name: "What languages are supported?",
          acceptedAnswer: { "@type": "Answer", text: "You can filter therapists by languages including English, Spanish, Hindi, Korean, and more." },
        },
      ],
    };

    const serviceLd = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Online Counseling",
      provider: { "@type": "Organization", name: "ZenithMind" },
      areaServed: "Global",
      audience: { "@type": "Audience", audienceType: ["Adults", "Professionals"] },
      serviceType: "Mental Health Counseling",
    };

    const scriptFaq = document.createElement('script');
    scriptFaq.type = 'application/ld+json';
    scriptFaq.text = JSON.stringify(faqLd);
    document.head.appendChild(scriptFaq);

    const scriptService = document.createElement('script');
    scriptService.type = 'application/ld+json';
    scriptService.text = JSON.stringify(serviceLd);
    document.head.appendChild(scriptService);

    return () => {
      // cleanup only scripts we added
      scriptFaq.remove();
      scriptService.remove();
      // keep meta/canonical for navigation stability
      if (desc) desc.setAttribute('content', '');
      if (canonical) canonical.setAttribute('href', canonicalHref);
    };
  }, []);
}

function CounselingHero() {
  return (
    <section className="border-b">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Online Counseling for Stress & Anxiety</h1>
          <p className="text-muted-foreground text-lg mb-6">
            Connect with licensed therapists who specialize in work-related stress, burnout, and anxiety. Private, secure, and flexible sessions.
          </p>
          <div className="flex gap-3">
            <Button asChild>
              <a href="#therapists">Find a therapist</a>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/assessment">Take Stress Assessment</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

interface Filters {
  specialization: string;
  modality: string;
  language: string;
  maxPrice: string; // as string for Input value
  date: string; // YYYY-MM-DD
}

function TherapistCard({ t, onBook }: { t: Therapist; onBook: (t: Therapist) => void }) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row gap-4 items-center">
        <img src={t.photo} alt={`${t.name} therapist profile`} loading="lazy" className="h-16 w-16 rounded-md object-cover" />
        <div className="flex-1">
          <CardTitle className="text-xl">{t.name}</CardTitle>
          <CardDescription>{t.title}</CardDescription>
          <div className="flex items-center gap-1 mt-2 text-sm">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>{t.rating.toFixed(1)}</span>
            <span className="text-muted-foreground">({t.reviews} reviews)</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">From</div>
          <div className="text-lg font-semibold">${t.price}</div>
          <div className="text-xs text-muted-foreground">per session</div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {t.specializations.map((s) => (
            <Badge key={s} variant="secondary">{s}</Badge>
          ))}
        </div>
        <div className="text-sm text-muted-foreground">Modalities: {t.modalities.join(", ")}</div>
        <div className="text-sm text-muted-foreground">Languages: {t.languages.join(", ")}</div>
        <Button className="mt-2" onClick={() => onBook(t)}>Book session</Button>
      </CardContent>
    </Card>
  );
}

function SafetyBanner() {
  return (
    <Alert>
      <ShieldAlert className="h-4 w-4" />
      <AlertTitle>Urgent help</AlertTitle>
      <AlertDescription>
        If you're in crisis or considering self-harm, seek immediate help. Call your local emergency number or a crisis hotline in your region.
      </AlertDescription>
    </Alert>
  );
}

export default function Counseling() {
  useSEO();
  const { toast } = useToast();

  const [filters, setFilters] = useState<Filters>({
    specialization: "all",
    modality: "all", 
    language: "all",
    maxPrice: "",
    date: "",
  });

  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [note, setNote] = useState("");

  const openBooking = (t: Therapist) => {
    setSelectedTherapist(t);
    setSelectedDate("");
    setSelectedTime("");
    setClientName("");
    setClientEmail("");
    setNote("");
    setBookingOpen(true);
  };

  const filtered = useMemo(() => {
    return THERAPISTS.filter((t) => {
      const bySpec = filters.specialization === "all" || t.specializations.includes(filters.specialization);
      const byMod = filters.modality === "all" || t.modalities.includes(filters.modality);
      const byLang = filters.language === "all" || t.languages.includes(filters.language);
      const byPrice = !filters.maxPrice || t.price <= Number(filters.maxPrice);
      const byDate = !filters.date || t.availability.some((a) => a.date === filters.date);
      return bySpec && byMod && byLang && byPrice && byDate;
    });
  }, [filters]);

  const availableDates = Array.from(new Set(THERAPISTS.flatMap((t) => t.availability.map((a) => a.date))));

  const handleConfirmBooking = () => {
    if (!selectedTherapist || !selectedDate || !selectedTime) return;

    const appointment = {
      id: `apt_${Date.now()}`,
      therapistId: selectedTherapist.id,
      therapistName: selectedTherapist.name,
      date: selectedDate,
      time: selectedTime,
      name: clientName,
      email: clientEmail,
      note,
      createdAt: new Date().toISOString(),
    };

    const key = "zenithmind_appointments";
    const prev = JSON.parse(localStorage.getItem(key) || "[]");
    prev.push(appointment);
    localStorage.setItem(key, JSON.stringify(prev));

    toast({
      title: "Session booked",
      description: `Your session with ${selectedTherapist.name} is scheduled on ${selectedDate} at ${selectedTime}.`,
    });
    setBookingOpen(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-6">
          <SafetyBanner />
        </section>

        <CounselingHero />

        <section id="therapists" className="container mx-auto px-4 py-10">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Find your therapist</h2>
            <p className="text-muted-foreground">Filter by what matters to you. All sessions are private and secure.</p>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label>Specialization</Label>
                <Select onValueChange={(v) => setFilters((f) => ({ ...f, specialization: v }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any</SelectItem>
                    <SelectItem value="Stress">Stress</SelectItem>
                    <SelectItem value="Anxiety">Anxiety</SelectItem>
                    <SelectItem value="Burnout">Burnout</SelectItem>
                    <SelectItem value="Depression">Depression</SelectItem>
                    <SelectItem value="Relationships">Relationships</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Modality</Label>
                <Select onValueChange={(v) => setFilters((f) => ({ ...f, modality: v }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any</SelectItem>
                    <SelectItem value="CBT">CBT</SelectItem>
                    <SelectItem value="Mindfulness">Mindfulness</SelectItem>
                    <SelectItem value="ACT">ACT</SelectItem>
                    <SelectItem value="DBT">DBT</SelectItem>
                    <SelectItem value="Trauma-informed">Trauma-informed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Language</Label>
                <Select onValueChange={(v) => setFilters((f) => ({ ...f, language: v }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                    <SelectItem value="Korean">Korean</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Max price (USD)</Label>
                <Input type="number" inputMode="numeric" min={50} step={5} placeholder="No limit" value={filters.maxPrice} onChange={(e) => setFilters((f) => ({ ...f, maxPrice: e.target.value }))} />
              </div>

              <div className="space-y-2">
                <Label>Earliest date</Label>
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="date" className="pl-9" value={filters.date} onChange={(e) => setFilters((f) => ({ ...f, date: e.target.value }))} list="available-dates" />
                  <datalist id="available-dates">
                    {availableDates.map((d) => (
                      <option key={d} value={d} />
                    ))}
                  </datalist>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((t) => (
              <TherapistCard key={t.id} t={t} onBook={openBooking} />
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full text-center text-muted-foreground">No therapists match your filters. Try adjusting your criteria.</div>
            )}
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <Card>
              <CardHeader>
                <CardTitle>How it works</CardTitle>
                <CardDescription>Three simple steps to get started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center font-semibold">1</div>
                  <div>
                    <div className="font-medium">Choose your therapist</div>
                    <div className="text-sm text-muted-foreground">Browse profiles and filter by specialization, language, and budget.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center font-semibold">2</div>
                  <div>
                    <div className="font-medium">Pick a time</div>
                    <div className="text-sm text-muted-foreground">Select a convenient slot that fits your schedule.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center font-semibold">3</div>
                  <div>
                    <div className="font-medium">Confirm & join</div>
                    <div className="text-sm text-muted-foreground">We'll store your booking locally and display an on-screen confirmation.</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Frequently asked questions</CardTitle>
                <CardDescription>Everything you need to know</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Do you take insurance?</AccordionTrigger>
                    <AccordionContent>
                      Coverage varies by region and provider. We currently do not process insurance claims in-app.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>What is your cancellation policy?</AccordionTrigger>
                    <AccordionContent>
                      You can cancel or reschedule up to 24 hours in advance without penalty.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Are sessions recorded?</AccordionTrigger>
                    <AccordionContent>
                      No. Sessions are private between you and your therapist.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />

      {/* Booking Dialog */}
      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm your session</DialogTitle>
            <DialogDescription>
              {selectedTherapist ? (
                <span>
                  Booking with <span className="font-medium">{selectedTherapist.name}</span>
                </span>
              ) : (
                "Select a therapist to continue"
              )}
            </DialogDescription>
          </DialogHeader>

          {selectedTherapist && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Select value={selectedDate} onValueChange={setSelectedDate}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a date" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedTherapist.availability.map((a) => (
                        <SelectItem key={a.date} value={a.date}>{a.date}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Time</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime} disabled={!selectedDate}>
                    <SelectTrigger>
                      <SelectValue placeholder={!selectedDate ? "Pick date first" : "Select a time"} />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedTherapist.availability.find((a) => a.date === selectedDate)?.times.map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Your name (optional)</Label>
                  <Input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Jane Doe" />
                </div>
                <div className="space-y-2">
                  <Label>Email (optional)</Label>
                  <Input type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} placeholder="jane@example.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Notes for your therapist (optional)</Label>
                <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Anything you'd like them to know ahead of time" />
              </div>
            </div>
          )}

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setBookingOpen(false)}>Cancel</Button>
            <Button disabled={!selectedTherapist || !selectedDate || !selectedTime} onClick={handleConfirmBooking}>
              <CheckCircle2 className="h-4 w-4 mr-2" /> Confirm booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
