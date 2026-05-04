/** Rooted in Healing palette (matches app/globals.css — inline for email clients). */
const C = {
  bg: "#0b100d",
  surface: "#0f1612",
  card: "#121c16",
  border: "#223027",
  text: "#f3efe6",
  muted: "#c9c1b2",
  accent: "#b08d57",
  accent2: "#6f7f5b",
} as const;

const FONT =
  'system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif';

/** Escape user-controlled strings for HTML email bodies. */
export function escapeHtml (value: string): string
{
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function row (label: string, value: string): string
{
  const v = value.trim() === "" ? "—" : escapeHtml(value.trim());
  const cellBase =
    "padding:14px 16px;border-bottom:1px solid " +
    C.border +
    ";vertical-align:top;font-size:14px;line-height:1.5;";
  return (
    "<tr>" +
    `<td style="${cellBase}width:38%;color:${C.muted};font-weight:600;">${escapeHtml(label)}</td>` +
    `<td style="${cellBase}color:${C.text};">${v}</td>` +
    "</tr>"
  );
}

export type IntakeEmailEmbedOptions = {
  /** When true, HTML embeds the CDIB image via `cid:rh-intake-cdib` (must match attachment `contentId`). */
  embedCdibImage: boolean;
  /** When true, HTML embeds the photo ID image via `cid:rh-intake-photoid`. */
  embedPhotoIdImage: boolean;
};

/** Content-IDs for inline images (must match route attachment contentId). */
export const INTAKE_EMAIL_CID = {
  cdib: "rh-intake-cdib",
  photoId: "rh-intake-photoid",
} as const;

export function buildIntakeEmailHtml (
  fields: Record<string, string>,
  embed?: IntakeEmailEmbedOptions
): string
{
  const r = row;
  const sections: { title: string; keys: [string, string][] }[] = [
    {
      title: "Personal",
      keys: [
        ["Full name", "fullName"],
        ["Phone", "phone"],
        ["Email", "email"],
        ["Street address", "streetAddress"],
        ["Birthday", "birthday"],
        ["Social Security number", "socialSecurity"],
        ["Gender", "gender"],
        ["Marital status", "maritalStatus"],
      ],
    },
    {
      title: "Emergency contact",
      keys: [
        ["Emergency contact name", "emergencyContactName"],
        ["Emergency contact phone", "emergencyContactPhone"],
      ],
    },
    {
      title: "Tribal affiliation",
      keys: [
        ["Member of a federally recognized tribe", "federallyRecognizedTribe"],
        ["Name of federally recognized tribe", "tribeName"],
      ],
    },
    {
      title: "Insurance",
      keys: [["Insurance plan name (if insured)", "insurancePlanName"]],
    },
    {
      title: "Substance use",
      keys: [
        ["Currently on any substances", "currentlyOnSubstances"],
        ["How long have you been abusing substances?", "substanceAbuseDuration"],
        ["What substances are you currently abusing?", "substancesCurrentlyAbusing"],
        ["How often are you abusing these substances?", "substanceAbuseFrequency"],
        ["Have you ever overdosed?", "everOverdosed"],
      ],
    },
    {
      title: "Health & relationships",
      keys: [
        [
          "Serious health problems or illnesses needing medical attention",
          "seriousHealthProblems",
        ],
        [
          "Prescription medications (including psychiatric)",
          "prescriptionMedications",
        ],
        [
          "Substance use interfered with personal relationships",
          "substanceUseRelationshipIssues",
        ],
      ],
    },
    {
      title: "Legal",
      keys: [
        ["Court issues, misdemeanor, felony, or probation", "courtIssues"],
        [
          "Permission from court or probation for out-of-state treatment",
          "courtPermissionOutOfState",
        ],
        ["Probation officer name", "probationOfficerName"],
        ["Probation officer phone", "probationOfficerPhone"],
      ],
    },
    {
      title: "Support & safety",
      keys: [
        ["Family or friends support recovery", "familyFriendsSupportRecovery"],
        ["Immediate danger to self or others", "immediateDanger"],
        ["Currently living in a safe place", "livingInSafePlace"],
        [
          "Past two years: tried to seriously harm self or attempt suicide",
          "selfHarmSuicideAttemptTwoYears",
        ],
      ],
    },
    {
      title: "Declaration",
      keys: [
        [
          "I declare the information is accurate and complete",
          "declarationAccurate",
        ],
      ],
    },
  ];

  const headerGradient =
    "background-color:" +
    C.card +
    ";" +
    "background-image:radial-gradient(circle at 18% 22%,rgba(176,141,87,0.35),transparent 42%),radial-gradient(circle at 82% 28%,rgba(111,127,91,0.28),transparent 48%);";

  let inner = "";

  inner +=
    `<tr><td style="${headerGradient}padding:28px 28px 24px;border-bottom:1px solid ${C.border};">` +
    `<p style="margin:0 0 6px;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${C.accent};font-family:${FONT};">Rooted in Healing</p>` +
    `<h1 style="margin:0;font-size:22px;font-weight:600;letter-spacing:-0.02em;color:${C.text};font-family:${FONT};line-height:1.25;">New intake submission</h1>` +
    `<p style="margin:12px 0 0;font-size:14px;line-height:1.55;color:${C.muted};font-family:${FONT};">Submitted from the website intake form. CDIB and photo ID files are included with this message (see below and your mail app’s attachments).</p>` +
    `</td></tr>`;

  inner +=
    `<tr><td style="padding:24px 28px 32px;background-color:${C.card};">`;

  if (embed)
  {
    const imgStyle =
      `display:block;max-width:100%;height:auto;border-radius:14px;border:1px solid ${C.border};margin-top:12px;`;
    inner +=
      `<p style="margin:0 0 10px;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${C.accent};font-family:${FONT};">Uploaded IDs</p>` +
      `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border:1px solid ${C.border};border-radius:16px;background-color:${C.surface};margin-bottom:8px;">` +
      `<tr><td style="padding:18px 18px 20px;font-family:${FONT};">` +
      `<p style="margin:0 0 4px;font-size:13px;font-weight:600;color:${C.text};">CDIB card</p>` +
      (embed.embedCdibImage
        ? `<img src="cid:${INTAKE_EMAIL_CID.cdib}" alt="CDIB card upload" width="552" style="${imgStyle}" />`
        : `<p style="margin:8px 0 0;font-size:13px;line-height:1.5;color:${C.muted};">File attached to this email (PDF or image—open the attachment named like <strong style="color:${C.text};">cdib-card…</strong>).</p>`) +
      `<p style="margin:20px 0 4px;font-size:13px;font-weight:600;color:${C.text};">Photo ID</p>` +
      (embed.embedPhotoIdImage
        ? `<img src="cid:${INTAKE_EMAIL_CID.photoId}" alt="Photo ID upload" width="552" style="${imgStyle}" />`
        : `<p style="margin:8px 0 0;font-size:13px;line-height:1.5;color:${C.muted};">File attached to this email—open the attachment named like <strong style="color:${C.text};">photo-id…</strong>.</p>`) +
      `</td></tr></table>`;
  }

  for (const sec of sections)
  {
    inner +=
      `<p style="margin:28px 0 10px;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${C.accent};font-family:${FONT};">${escapeHtml(sec.title)}</p>` +
      `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border:1px solid ${C.border};border-radius:16px;overflow:hidden;background-color:${C.surface};font-family:${FONT};">`;
    for (const [label, key] of sec.keys)
    {
      inner += r(label, fields[key] ?? "");
    }
    inner += `</table>`;
  }

  inner +=
    `<p style="margin:32px 0 0;padding-top:20px;border-top:1px solid ${C.border};font-size:12px;line-height:1.5;color:${C.muted};font-family:${FONT};">` +
    "This message may contain sensitive health information. Store and forward only as your policies allow." +
    "</p>" +
    `</td></tr>`;

  return (
    `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="color-scheme" content="dark"><meta name="supported-color-schemes" content="dark"></head>` +
    `<body style="margin:0;padding:0;background-color:${C.bg};">` +
    `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:${C.bg};padding:32px 16px;">` +
    `<tr><td align="center">` +
    `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;border-collapse:separate;border-spacing:0;background-color:${C.card};border-radius:24px;border:1px solid ${C.border};overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.35);">` +
    inner +
    `</table>` +
    `</td></tr></table></body></html>`
  );
}
