import Image from "next/image";
import { Great_Vibes } from "next/font/google";
import { aboutPage } from "@/data/data";
import Watermark from "@/components/ui/Watermark";
import CmsSection from "@/components/ui/CmsSection";

/** Script face, loaded here only — it exists for the signature and nothing else. */
const signatureFont = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// Renders the client's `about-us` CMS entry once they add one via CKEditor
// (see CmsSection), falling back to the static section below until then.
export default function AboutIntro() {
  const { intro } = aboutPage;

  return (
    <CmsSection slug="about-us" id="about-us" className="">
      <section className="relative overflow-hidden pt-10 lg:pt-14 pb-20 lg:pb-28">
        <Watermark
          motif="fern"
          className="w-40 lg:w-64 -left-10 top-16 text-gold/7"
          rotate={-8}
          duration={18}
        />
        <Watermark
          motif="bird"
          className="w-28 lg:w-40 right-[10%] top-10 text-luxury-charcoal/5"
          rotate={-6}
          duration={13}
          delay={1.5}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* --- Stacked imagery ------------------------------------------
              The small frame sits on the big one's bottom-right corner and
              hangs past it by the container's padding-bottom, so nothing
              needs a transform that would spill into the next section. */}
          <div className="relative pb-20 lg:pb-24 animate-slide-in-left">
            <div className="luxury-media luxury-img-zoom aspect-4/3 w-[88%]">
              <Image
                src={intro.image}
                alt="Mature tropical gardens at Hotel Parkland"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="luxury-media luxury-img-zoom absolute right-0 bottom-0 w-[54%] aspect-square ring-8 ring-white shadow-[0_24px_60px_-30px_rgba(36,36,32,0.5)]">
              <Image
                src={intro.imageOverlap}
                alt="Elephant bathing in the Rapti river near Sauraha"
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* --- Copy ------------------------------------------------------ */}
          <div className="animate-slide-in-right">
            <h1 className="luxury-section-title text-luxury-charcoal mb-6  leading-[1.15]">
              {intro.title}
            </h1>

            {intro.paragraphs.map((paragraph, i) => (
              <p key={i} className="text-luxury-muted leading-relaxed mb-5">
                {paragraph}
              </p>
            ))}

            <div className="mt-10">
              <p
                className={`${signatureFont.className} text-5xl lg:text-6xl text-gold-text leading-none`}
              >
                {intro.signature}
              </p>
              <p className="luxury-label text-[10px] text-luxury-muted mt-4">
                {intro.signatureRole}
              </p>
            </div>
          </div>
        </div>
      </section>
    </CmsSection>
  );
}
