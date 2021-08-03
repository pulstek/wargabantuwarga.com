import cheerio from "cheerio";
import { Faq, Faqs } from "~/lib/data/faqs";

export const parseFAQ = async (html: string): Promise<Faqs> => {
  const $ = cheerio.load(html);
  const faqRows = $("#sheets-viewport > div#0").find(
    "table tbody tr:not(:first)",
  );

  const faqJSON: Faqs = faqRows
    .map((_, el) => {
      const row = $(el).find("td");
      const faq: Faq = {
        kategori_pertanyaan: $(row.get(0)).text(),
        pertanyaan: $(row.get(1)).text(),
        jawaban: $(row.get(2)).html() ?? "",
        created_date: $(row.get(3)).text(),
        sumber: $(row.get(4)).text(),
        link: $(row.get(5)).text(),
        published_date: $(row.get(6)).text(),
      };

      return faq;
    })
    .toArray();

  return faqJSON;
};
