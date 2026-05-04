import { Resend } from "resend";
import {
  buildIntakeEmailHtml,
  INTAKE_EMAIL_CID,
} from "@/lib/contact-intake-email";

const INTAKE_TO = "rootedinhealing657@gmail.com";
const MAX_FILE_BYTES = 6 * 1024 * 1024; /* stay under typical serverless body limits */
const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "application/pdf",
]);

function extForMime (mime: string): string
{
  switch (mime)
  {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/heic":
    case "image/heif":
      return "heic";
    case "application/pdf":
      return "pdf";
    default:
      return "bin";
  }
}

function getTrimmed (form: FormData, key: string): string
{
  const v = form.get(key);
  return typeof v === "string" ? v.trim() : "";
}

function requireYesNo (v: string, label: string): string | null
{
  if (v !== "yes" && v !== "no")
  {
    return `${label} must be Yes or No.`;
  }
  return null;
}

export async function POST (req: Request): Promise<Response>
{
  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.RESEND_FROM?.trim() ||
    "Rooted in Healing <onboarding@resend.dev>";

  if (!apiKey)
  {
    return Response.json(
      { ok: false, error: "Email is not configured on the server." },
      { status: 503 }
    );
  }

  let form: FormData;
  try
  {
    form = await req.formData();
  }
  catch
  {
    return Response.json(
      { ok: false, error: "Could not read form submission." },
      { status: 400 }
    );
  }

  const fullName = getTrimmed(form, "fullName");
  const phone = getTrimmed(form, "phone");
  const email = getTrimmed(form, "email");
  const streetAddress = getTrimmed(form, "streetAddress");
  const birthday = getTrimmed(form, "birthday");
  const socialSecurity = getTrimmed(form, "socialSecurity");
  const gender = getTrimmed(form, "gender");
  const maritalStatus = getTrimmed(form, "maritalStatus");
  const emergencyContactName = getTrimmed(form, "emergencyContactName");
  const emergencyContactPhone = getTrimmed(form, "emergencyContactPhone");
  const federallyRecognizedTribe = getTrimmed(form, "federallyRecognizedTribe");
  const tribeName = getTrimmed(form, "tribeName");
  const insurancePlanName = getTrimmed(form, "insurancePlanName");
  const currentlyOnSubstances = getTrimmed(form, "currentlyOnSubstances");
  const substanceAbuseDuration = getTrimmed(form, "substanceAbuseDuration");
  const substancesCurrentlyAbusing = getTrimmed(form, "substancesCurrentlyAbusing");
  const substanceAbuseFrequency = getTrimmed(form, "substanceAbuseFrequency");
  const everOverdosed = getTrimmed(form, "everOverdosed");
  const seriousHealthProblems = getTrimmed(form, "seriousHealthProblems");
  const prescriptionMedications = getTrimmed(form, "prescriptionMedications");
  const substanceUseRelationshipIssues = getTrimmed(
    form,
    "substanceUseRelationshipIssues"
  );
  const courtIssues = getTrimmed(form, "courtIssues");
  const courtPermissionOutOfState = getTrimmed(form, "courtPermissionOutOfState");
  const probationOfficerName = getTrimmed(form, "probationOfficerName");
  const probationOfficerPhone = getTrimmed(form, "probationOfficerPhone");
  const familyFriendsSupportRecovery = getTrimmed(
    form,
    "familyFriendsSupportRecovery"
  );
  const immediateDanger = getTrimmed(form, "immediateDanger");
  const livingInSafePlace = getTrimmed(form, "livingInSafePlace");
  const selfHarmSuicideAttemptTwoYears = getTrimmed(
    form,
    "selfHarmSuicideAttemptTwoYears"
  );
  const declarationAccurate = getTrimmed(form, "declarationAccurate");

  const errors: string[] = [];
  if (fullName === "") errors.push("Full name is required.");
  if (phone === "") errors.push("Phone is required.");
  if (email === "") errors.push("Email is required.");
  if (streetAddress === "") errors.push("Street address is required.");
  if (birthday === "") errors.push("Birthday is required.");
  if (socialSecurity === "") errors.push("Social Security number is required.");
  if (gender === "") errors.push("Gender is required.");
  if (maritalStatus === "") errors.push("Marital status is required.");
  if (emergencyContactName === "") errors.push("Emergency contact name is required.");
  if (emergencyContactPhone === "") errors.push("Emergency contact phone is required.");

  const eTribe = requireYesNo(federallyRecognizedTribe, "Tribal membership");
  if (eTribe) errors.push(eTribe);
  if (federallyRecognizedTribe === "yes" && tribeName === "")
  {
    errors.push("Tribe name is required when you are a member of a federally recognized tribe.");
  }

  const eSubs = requireYesNo(currentlyOnSubstances, "Substances");
  if (eSubs) errors.push(eSubs);
  if (currentlyOnSubstances === "yes")
  {
    if (substanceAbuseDuration === "") errors.push("How long abusing substances is required.");
    if (substancesCurrentlyAbusing === "") errors.push("Current substances is required.");
    if (substanceAbuseFrequency === "") errors.push("Frequency of use is required.");
  }

  const eOd = requireYesNo(everOverdosed, "Overdose history");
  if (eOd) errors.push(eOd);

  if (seriousHealthProblems === "") errors.push("Health problems question is required.");
  if (prescriptionMedications === "") errors.push("Medications question is required.");

  const eRel = requireYesNo(substanceUseRelationshipIssues, "Relationships");
  if (eRel) errors.push(eRel);

  const eCourt = requireYesNo(courtIssues, "Court / legal status");
  if (eCourt) errors.push(eCourt);
  if (courtIssues === "yes")
  {
    const ePerm = requireYesNo(
      courtPermissionOutOfState,
      "Out-of-state treatment permission"
    );
    if (ePerm) errors.push(ePerm);
  }

  const eFam = requireYesNo(familyFriendsSupportRecovery, "Support system");
  if (eFam) errors.push(eFam);
  const eDan = requireYesNo(immediateDanger, "Immediate danger");
  if (eDan) errors.push(eDan);
  const eSafe = requireYesNo(livingInSafePlace, "Safe housing");
  if (eSafe) errors.push(eSafe);
  const eHarm = requireYesNo(
    selfHarmSuicideAttemptTwoYears,
    "Self-harm / suicide attempt"
  );
  if (eHarm) errors.push(eHarm);

  if (declarationAccurate !== "yes")
  {
    errors.push("You must confirm that your information is accurate and complete.");
  }

  const cdib = form.get("cdibCard");
  const photoId = form.get("photoId");
  /** Resend JSON body must use base64 strings — `Buffer` does not serialize correctly with `JSON.stringify`. */
  const attachments: {
    filename: string;
    content: string;
    contentType?: string;
    contentId?: string;
  }[] = [];

  let embedCdibImage = false;
  let embedPhotoIdImage = false;
  let cdibFilenameForText = "cdib-card";
  let photoIdFilenameForText = "photo-id";

  async function pushFile (
    entry: FormDataEntryValue | null,
    label: string,
    kind: "cdib" | "photoid"
  ): Promise<void>
  {
    if (!(entry instanceof File) || entry.size === 0)
    {
      errors.push(`${label} upload is required.`);
      return;
    }
    if (entry.size > MAX_FILE_BYTES)
    {
      errors.push(`${label} must be ${MAX_FILE_BYTES / (1024 * 1024)}MB or smaller.`);
      return;
    }
    const type = entry.type || "application/octet-stream";
    if (!ALLOWED_MIME.has(type))
    {
      errors.push(`${label} must be JPEG, PNG, WebP, HEIC, or PDF.`);
      return;
    }
    const buf = Buffer.from(await entry.arrayBuffer());
    const ext = extForMime(type);
    const filename = kind === "cdib" ? `cdib-card.${ext}` : `photo-id.${ext}`;
    if (kind === "cdib") cdibFilenameForText = filename;
    else photoIdFilenameForText = filename;

    const isRasterImage =
      type === "image/jpeg" ||
      type === "image/png" ||
      type === "image/webp";
    if (kind === "cdib") embedCdibImage = isRasterImage;
    else embedPhotoIdImage = isRasterImage;

    const contentId =
      kind === "cdib" ? INTAKE_EMAIL_CID.cdib : INTAKE_EMAIL_CID.photoId;

    attachments.push({
      filename,
      content: buf.toString("base64"),
      contentType: type,
      ...(isRasterImage ? { contentId } : {}),
    });
  }

  await pushFile(cdib, "CDIB card photo", "cdib");
  await pushFile(photoId, "Photo ID", "photoid");

  if (errors.length > 0)
  {
    return Response.json({ ok: false, error: errors.join(" ") }, { status: 400 });
  }

  const fields: Record<string, string> = {
    fullName,
    phone,
    email,
    streetAddress,
    birthday,
    socialSecurity,
    gender,
    maritalStatus,
    emergencyContactName,
    emergencyContactPhone,
    federallyRecognizedTribe: federallyRecognizedTribe === "yes" ? "Yes" : "No",
    tribeName,
    insurancePlanName,
    currentlyOnSubstances: currentlyOnSubstances === "yes" ? "Yes" : "No",
    substanceAbuseDuration,
    substancesCurrentlyAbusing,
    substanceAbuseFrequency,
    everOverdosed: everOverdosed === "yes" ? "Yes" : "No",
    seriousHealthProblems,
    prescriptionMedications,
    substanceUseRelationshipIssues:
      substanceUseRelationshipIssues === "yes" ? "Yes" : "No",
    courtIssues: courtIssues === "yes" ? "Yes" : "No",
    courtPermissionOutOfState:
      courtIssues === "no"
        ? "N/A"
        : courtPermissionOutOfState === "yes"
          ? "Yes"
          : courtPermissionOutOfState === "no"
            ? "No"
            : "",
    probationOfficerName,
    probationOfficerPhone,
    familyFriendsSupportRecovery:
      familyFriendsSupportRecovery === "yes" ? "Yes" : "No",
    immediateDanger: immediateDanger === "yes" ? "Yes" : "No",
    livingInSafePlace: livingInSafePlace === "yes" ? "Yes" : "No",
    selfHarmSuicideAttemptTwoYears:
      selfHarmSuicideAttemptTwoYears === "yes" ? "Yes" : "No",
    declarationAccurate: "Yes",
  };

  const html = buildIntakeEmailHtml(fields, {
    embedCdibImage,
    embedPhotoIdImage,
  });
  const idempotencyKey = getTrimmed(form, "idempotencyKey") || crypto.randomUUID();
  const to = process.env.CONTACT_INTAKE_TO?.trim() || INTAKE_TO;

  const textBody =
    `Intake from ${fullName} (${phone}, ${email}).\n\n` +
    `Attachments (open in your mail app): ${cdibFilenameForText}, ${photoIdFilenameForText}.\n\n` +
    "Open the HTML version of this message for the full questionnaire responses.";

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send(
    {
      from,
      to: [to],
      replyTo: email,
      subject: `Intake form: ${fullName}`,
      html,
      text: textBody,
      attachments,
    },
    { idempotencyKey: `contact-intake/${idempotencyKey}` }
  );

  if (error)
  {
    console.error("Resend error:", error.message);
    return Response.json(
      { ok: false, error: "Could not send email. Please try again later." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true, id: data?.id ?? null });
}

export const runtime = "nodejs";
