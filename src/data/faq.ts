export type FaqCategoryDef = {
  id: string;
  titleKey: string;
  items: Array<{ qKey: string; aKey: string }>;
};

export const faqCategories: FaqCategoryDef[] = [
  {
    id: "services",
    titleKey: "faq.cat.services",
    items: [
      { qKey: "faq.s.q1", aKey: "faq.s.a1" },
      { qKey: "faq.s.q2", aKey: "faq.s.a2" },
      { qKey: "faq.s.q3", aKey: "faq.s.a3" },
      { qKey: "faq.s.q4", aKey: "faq.s.a4" },
      { qKey: "faq.s.q5", aKey: "faq.s.a5" },
      { qKey: "faq.s.q6", aKey: "faq.s.a6" },
    ],
  },
  {
    id: "shipping",
    titleKey: "faq.cat.shipping",
    items: [
      { qKey: "faq.sh.q1", aKey: "faq.sh.a1" },
      { qKey: "faq.sh.q2", aKey: "faq.sh.a2" },
      { qKey: "faq.sh.q3", aKey: "faq.sh.a3" },
      { qKey: "faq.sh.q4", aKey: "faq.sh.a4" },
      { qKey: "faq.sh.q5", aKey: "faq.sh.a5" },
      { qKey: "faq.sh.q6", aKey: "faq.sh.a6" },
      { qKey: "faq.sh.q7", aKey: "faq.sh.a7" },
    ],
  },
  {
    id: "returns",
    titleKey: "faq.cat.returns",
    items: [
      { qKey: "faq.r.q1", aKey: "faq.r.a1" },
      { qKey: "faq.r.q2", aKey: "faq.r.a2" },
      { qKey: "faq.r.q3", aKey: "faq.r.a3" },
    ],
  },
  {
    id: "other",
    titleKey: "faq.cat.other",
    items: [
      { qKey: "faq.o.q1", aKey: "faq.o.a1" },
      { qKey: "faq.o.q2", aKey: "faq.o.a2" },
      { qKey: "faq.o.q3", aKey: "faq.o.a3" },
    ],
  },
];
