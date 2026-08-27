import { getFaqs } from "@/lib/data";
import { faqPage } from "@/data/data";
import FaqAccordionClient from "./FaqAccordionClient";

export default async function FaqAccordion() {
  const items = await getFaqs();
  return <FaqAccordionClient items={items.length > 0 ? items : faqPage.items} />;
}
