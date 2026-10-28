/**
 * Draft text for the Privacy Policy and Terms of Service.
 *
 * IMPORTANT: these are drafts written from what the website actually does (see
 * app/api/leads/route.ts and lib/validation.ts) so that the pages say something true. They have
 * NOT been reviewed by KALA or by a legal adviser, and the pages say so on their face. Before
 * public launch the responsible person must read, correct and approve them, then set
 * `LEGAL_STATUS` to "approved" below — that removes the draft notice and nothing else.
 *
 * Things only KALA can confirm, and which the reviewer should check:
 *  - where enquiries are stored and who can see them (set when LEADS_WEBHOOK_URL is chosen);
 *  - how long enquiry details are kept;
 *  - an email address for privacy requests (none has been supplied; phone/WhatsApp is used);
 *  - whether courses are open to under-18s;
 *  - the registered name of the business, and the governing law / courts;
 *  - remove the "illustrative images" sentence in the Terms once real photographs replace the
 *    computer-generated concept images.
 */
import { SITE_LOCATION, SITE_PHONE_DISPLAY } from "@/data/site";

export type LegalStatus = "draft" | "approved";

/** Flip to "approved" only after KALA (or its adviser) has reviewed and accepted both texts. */
export const LEGAL_STATUS: LegalStatus = "draft";

export const LEGAL_UPDATED = "28 October 2026";

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  items?: string[];
}

export interface LegalDoc {
  eyebrow: string;
  title: string;
  intro: string;
  sections: LegalSection[];
}

const CONTACT = `${SITE_PHONE_DISPLAY} (call or WhatsApp), ${SITE_LOCATION}`;

export const PRIVACY_POLICY: LegalDoc = {
  eyebrow: "Legal",
  title: "Privacy Policy",
  intro:
    "This page explains what personal information KALA Beauty & Fashion Academy collects through this website, why, and the choices you have. We keep it short and plain on purpose.",
  sections: [
    {
      heading: "What we collect",
      paragraphs: [
        "We only collect personal information when you send us an enquiry through a form on this website. The form asks for:",
      ],
      items: [
        "your name and phone / WhatsApp number;",
        "the craft you are interested in and what you hope to achieve (career, business, personal skill or upskilling);",
        "optionally, the time of day you prefer to be contacted.",
      ],
    },
    {
      heading: "What is recorded automatically",
      paragraphs: [
        "With each enquiry we also record the page you sent it from (and the course, if you were on a course page), the date and time, and a random reference number, so that the right advisor can follow up. If you open WhatsApp or the phone dialler from a button on the site, that message or call is handled by that app, not by this website.",
        "To stop automated spam, your device's network address is held briefly in the server's memory to count repeated submissions. It is not saved with your enquiry. Our hosting provider also keeps standard technical logs (for example, the time of a request) as any web host does.",
      ],
    },
    {
      heading: "Why we use it",
      paragraphs: [
        "We use your details to reply to your enquiry, to tell you about the course you asked about (including duration, fees and admissions), and to manage your admission if you decide to join. We do not use them for anything unrelated, and we do not sell them.",
      ],
    },
    {
      heading: "Who sees it",
      paragraphs: [
        "Your enquiry is delivered to KALA's admissions team through the tools KALA uses to receive and manage enquiries (for example a spreadsheet, messaging or email service). The companies that provide those tools handle the information on KALA's behalf. We may also share information where the law requires it.",
      ],
    },
    {
      heading: "Cookies and tracking",
      paragraphs: [
        "At the time of writing this website does not set cookies and does not use advertising or analytics trackers. If that changes, we will update this page first.",
      ],
    },
    {
      heading: "How long we keep it",
      paragraphs: [
        "We keep enquiry details only for as long as we need them to respond to you and to manage admissions, and then delete or anonymise them.",
      ],
    },
    {
      heading: "Your choices",
      paragraphs: [
        "You can ask us what we hold about you, ask us to correct it, ask us to delete it, or ask us to stop contacting you. Contact us using the details below and we will respond.",
      ],
    },
    {
      heading: "Young people",
      paragraphs: [
        "If you are under 18, please ask a parent or guardian to send the enquiry or to contact us with you.",
      ],
    },
    {
      heading: "Changes to this page",
      paragraphs: [
        "We may update this policy. The date at the top shows when it last changed.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [`KALA Beauty & Fashion Academy — ${CONTACT}.`],
    },
  ],
};

export const TERMS_OF_SERVICE: LegalDoc = {
  eyebrow: "Legal",
  title: "Terms of Service",
  intro:
    "These terms apply when you use this website. By using it you agree to them. If you do not agree, please do not use the site.",
  sections: [
    {
      heading: "About this website",
      paragraphs: [
        "This website gives information about the courses and activities of KALA Beauty & Fashion Academy and lets you contact us. It is not an online store and nothing on it is a binding offer.",
      ],
    },
    {
      heading: "Course information",
      paragraphs: [
        "Course descriptions on this website are an overview of what each course covers. Fees, duration, batch dates, timings and seat availability are confirmed with you by a KALA course advisor when you enquire, and may change. The website does not show a fee unless it is marked as confirmed.",
      ],
    },
    {
      heading: "Possibilities, not promises",
      paragraphs: [
        "When we describe the careers or work a course can lead to, we describe possibilities only. KALA does not promise a job, a placement, a business or any level of income.",
      ],
    },
    {
      heading: "Enquiries and admission",
      paragraphs: [
        "Sending an enquiry does not reserve a seat or create an admission. Admission to a course follows KALA's own admission process, which a course advisor will explain.",
      ],
    },
    {
      heading: "Using the website",
      paragraphs: ["Please use the website lawfully and considerately. In particular, do not:"],
      items: [
        "send false, abusive or automated (spam) enquiries;",
        "try to disrupt, probe or gain unauthorised access to the website or its systems;",
        "copy or reuse the website's content to suggest it comes from you.",
      ],
    },
    {
      heading: "Content and images",
      paragraphs: [
        "The text, design, logo and images on this website belong to KALA Beauty & Fashion Academy or are used with permission, and may not be copied or reused without our written consent.",
        "Some images on this website are illustrative, including computer-generated concept images, and may not show KALA's actual students, trainers or premises.",
      ],
    },
    {
      heading: "Links to other services",
      paragraphs: [
        "The website links to services we do not run, such as WhatsApp and Google Maps. Their own terms and privacy policies apply when you use them, and we are not responsible for them.",
      ],
    },
    {
      heading: "Our responsibility",
      paragraphs: [
        "We take care to keep the information on this website accurate and the site available, but we cannot guarantee that it is always error-free or uninterrupted. To the extent the law allows, KALA is not liable for loss that results from relying on the website's information or from it being unavailable. Nothing in these terms limits any right you have under the law that cannot be limited.",
      ],
    },
    {
      heading: "Changes and governing law",
      paragraphs: [
        "We may change these terms; the date at the top shows the latest version, and using the website after a change means you accept it. These terms are governed by the laws of India.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [`KALA Beauty & Fashion Academy — ${CONTACT}.`],
    },
  ],
};
