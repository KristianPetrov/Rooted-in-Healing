"use client";

import { useCallback, useMemo, useState } from "react";

type YesNo = "yes" | "no" | "";

const TOTAL_STEPS = 9;
const MAX_FILE_BYTES = 6 * 1024 * 1024;

type IntakeFormState = {
  fullName: string;
  phone: string;
  email: string;
  streetAddress: string;
  birthday: string;
  socialSecurity: string;
  gender: string;
  maritalStatus: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  federallyRecognizedTribe: YesNo;
  tribeName: string;
  insurancePlanName: string;
  currentlyOnSubstances: YesNo;
  substanceAbuseDuration: string;
  substancesCurrentlyAbusing: string;
  substanceAbuseFrequency: string;
  everOverdosed: YesNo;
  seriousHealthProblems: string;
  prescriptionMedications: string;
  substanceUseRelationshipIssues: YesNo;
  courtIssues: YesNo;
  courtPermissionOutOfState: YesNo;
  probationOfficerName: string;
  probationOfficerPhone: string;
  familyFriendsSupportRecovery: YesNo;
  immediateDanger: YesNo;
  livingInSafePlace: YesNo;
  selfHarmSuicideAttemptTwoYears: YesNo;
  declarationAccurate: boolean;
  cdibCard: File | null;
  photoId: File | null;
};

const initialState: IntakeFormState = {
  fullName: "",
  phone: "",
  email: "",
  streetAddress: "",
  birthday: "",
  socialSecurity: "",
  gender: "",
  maritalStatus: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  federallyRecognizedTribe: "",
  tribeName: "",
  insurancePlanName: "",
  currentlyOnSubstances: "",
  substanceAbuseDuration: "",
  substancesCurrentlyAbusing: "",
  substanceAbuseFrequency: "",
  everOverdosed: "",
  seriousHealthProblems: "",
  prescriptionMedications: "",
  substanceUseRelationshipIssues: "",
  courtIssues: "",
  courtPermissionOutOfState: "",
  probationOfficerName: "",
  probationOfficerPhone: "",
  familyFriendsSupportRecovery: "",
  immediateDanger: "",
  livingInSafePlace: "",
  selfHarmSuicideAttemptTwoYears: "",
  declarationAccurate: false,
  cdibCard: null,
  photoId: null,
};

function inputClass (invalid?: boolean): string
{
  return [
    "mt-1 w-full rounded-2xl border bg-surface px-4 py-2.5 text-sm text-foreground outline-none ring-0 transition",
    invalid
      ? "border-red-500/80 focus:border-red-400"
      : "border-border/80 focus:border-accent",
  ].join(" ");
}

function labelClass (): string
{
  return "block text-sm font-medium text-foreground";
}

function YesNoField ({
  name,
  value,
  onChange,
  label,
  invalid,
}: {
  name: string;
  value: YesNo;
  onChange: (v: YesNo) => void;
  label: string;
  invalid?: boolean;
})
{
  return (
    <fieldset>
      <legend className={labelClass()}>{label}</legend>
      <div
        className={`mt-2 flex flex-wrap gap-4 rounded-2xl border px-4 py-3 ${invalid ? "border-red-500/80" : "border-border/80"}`}
      >
        {(["yes", "no"] as const).map((opt) => (
          <label key={opt} className="inline-flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="radio"
              name={name}
              checked={value === opt}
              onChange={() => onChange(opt)}
              className="accent-accent"
            />
            <span>{opt === "yes" ? "Yes" : "No"}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function validateStep (step: number, s: IntakeFormState): string[]
{
  const err: string[] = [];
  switch (step)
  {
    case 0:
      if (!s.fullName.trim()) err.push("Name is required.");
      if (!s.phone.trim()) err.push("Phone is required.");
      if (!s.email.trim()) err.push("Email is required.");
      if (!s.streetAddress.trim()) err.push("Street address is required.");
      if (!s.birthday.trim()) err.push("Birthday is required.");
      if (!s.socialSecurity.trim()) err.push("Social Security number is required.");
      if (!s.gender.trim()) err.push("Gender is required.");
      if (!s.maritalStatus.trim()) err.push("Marital status is required.");
      break;
    case 1:
      if (!s.emergencyContactName.trim()) err.push("Emergency contact name is required.");
      if (!s.emergencyContactPhone.trim()) err.push("Emergency contact phone is required.");
      break;
    case 2:
      if (s.federallyRecognizedTribe !== "yes" && s.federallyRecognizedTribe !== "no")
      {
        err.push("Please answer whether you are a member of a federally recognized tribe.");
      }
      if (s.federallyRecognizedTribe === "yes" && !s.tribeName.trim())
      {
        err.push("Tribe name is required.");
      }
      break;
    case 3:
      if (!s.cdibCard || s.cdibCard.size === 0) err.push("CDIB card photo is required.");
      else if (s.cdibCard.size > MAX_FILE_BYTES) err.push("CDIB file is too large (max 6MB).");
      if (!s.photoId || s.photoId.size === 0) err.push("Photo ID is required.");
      else if (s.photoId.size > MAX_FILE_BYTES) err.push("Photo ID file is too large (max 6MB).");
      break;
    case 4:
      break;
    case 5:
      if (s.currentlyOnSubstances !== "yes" && s.currentlyOnSubstances !== "no")
      {
        err.push("Please answer whether you are currently on any substances.");
      }
      if (s.currentlyOnSubstances === "yes")
      {
        if (!s.substanceAbuseDuration.trim()) err.push("How long you have been using is required.");
        if (!s.substancesCurrentlyAbusing.trim()) err.push("Current substances is required.");
        if (!s.substanceAbuseFrequency.trim()) err.push("How often is required.");
      }
      if (s.everOverdosed !== "yes" && s.everOverdosed !== "no")
      {
        err.push("Please answer whether you have ever overdosed.");
      }
      break;
    case 6:
      if (!s.seriousHealthProblems.trim())
      {
        err.push("Serious health problems or illnesses question is required.");
      }
      if (!s.prescriptionMedications.trim())
      {
        err.push("Prescription medications question is required.");
      }
      if (
        s.substanceUseRelationshipIssues !== "yes" &&
        s.substanceUseRelationshipIssues !== "no"
      )
      {
        err.push("Please answer about relationships and substance use.");
      }
      break;
    case 7:
      if (s.courtIssues !== "yes" && s.courtIssues !== "no")
      {
        err.push("Please answer about court or legal status.");
      }
      if (s.courtIssues === "yes")
      {
        if (s.courtPermissionOutOfState !== "yes" && s.courtPermissionOutOfState !== "no")
        {
          err.push("Please answer about permission for out-of-state treatment.");
        }
      }
      break;
    case 8:
      if (s.familyFriendsSupportRecovery !== "yes" && s.familyFriendsSupportRecovery !== "no")
      {
        err.push("Please answer about family or friends supporting recovery.");
      }
      if (s.immediateDanger !== "yes" && s.immediateDanger !== "no")
      {
        err.push("Please answer about immediate danger.");
      }
      if (s.livingInSafePlace !== "yes" && s.livingInSafePlace !== "no")
      {
        err.push("Please answer whether you are living in a safe place.");
      }
      if (
        s.selfHarmSuicideAttemptTwoYears !== "yes" &&
        s.selfHarmSuicideAttemptTwoYears !== "no"
      )
      {
        err.push("Please answer about self-harm or suicide attempts in the past two years.");
      }
      if (!s.declarationAccurate) err.push("You must confirm your information is accurate.");
      break;
    default:
      break;
  }
  return err;
}

function appendFields (fd: FormData, s: IntakeFormState): void
{
  fd.append("fullName", s.fullName.trim());
  fd.append("phone", s.phone.trim());
  fd.append("email", s.email.trim());
  fd.append("streetAddress", s.streetAddress.trim());
  fd.append("birthday", s.birthday.trim());
  fd.append("socialSecurity", s.socialSecurity.trim());
  fd.append("gender", s.gender.trim());
  fd.append("maritalStatus", s.maritalStatus.trim());
  fd.append("emergencyContactName", s.emergencyContactName.trim());
  fd.append("emergencyContactPhone", s.emergencyContactPhone.trim());
  fd.append("federallyRecognizedTribe", s.federallyRecognizedTribe);
  fd.append("tribeName", s.tribeName.trim());
  fd.append("insurancePlanName", s.insurancePlanName.trim());
  fd.append("currentlyOnSubstances", s.currentlyOnSubstances);
  fd.append("substanceAbuseDuration", s.substanceAbuseDuration.trim());
  fd.append("substancesCurrentlyAbusing", s.substancesCurrentlyAbusing.trim());
  fd.append("substanceAbuseFrequency", s.substanceAbuseFrequency.trim());
  fd.append("everOverdosed", s.everOverdosed);
  fd.append("seriousHealthProblems", s.seriousHealthProblems.trim());
  fd.append("prescriptionMedications", s.prescriptionMedications.trim());
  fd.append("substanceUseRelationshipIssues", s.substanceUseRelationshipIssues);
  fd.append("courtIssues", s.courtIssues);
  fd.append("courtPermissionOutOfState", s.courtPermissionOutOfState);
  fd.append("probationOfficerName", s.probationOfficerName.trim());
  fd.append("probationOfficerPhone", s.probationOfficerPhone.trim());
  fd.append("familyFriendsSupportRecovery", s.familyFriendsSupportRecovery);
  fd.append("immediateDanger", s.immediateDanger);
  fd.append("livingInSafePlace", s.livingInSafePlace);
  fd.append("selfHarmSuicideAttemptTwoYears", s.selfHarmSuicideAttemptTwoYears);
  fd.append("declarationAccurate", s.declarationAccurate ? "yes" : "no");
  if (s.cdibCard) fd.append("cdibCard", s.cdibCard);
  if (s.photoId) fd.append("photoId", s.photoId);
}

const stepTitles = [
  "Personal information",
  "Emergency contact",
  "Tribal affiliation",
  "Documents",
  "Insurance",
  "Substance use",
  "Health & relationships",
  "Legal status",
  "Support, safety & declaration",
];

export default function IntakeMultiStepForm ()
{
  const [step, setStep] = useState(0);
  const [s, setS] = useState<IntakeFormState>(initialState);
  const [stepErrors, setStepErrors] = useState<string[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const progress = useMemo(
    () => Math.round(((step + 1) / TOTAL_STEPS) * 100),
    [step]
  );

  const update = useCallback(<K extends keyof IntakeFormState> (key: K, value: IntakeFormState[K]) =>
  {
    setS((prev) => ({ ...prev, [key]: value }));
    setStepErrors([]);
    setSubmitError(null);
  }, []);

  const next = useCallback(() =>
  {
    const e = validateStep(step, s);
    if (e.length > 0)
    {
      setStepErrors(e);
      return;
    }
    setStep((x) => Math.min(x + 1, TOTAL_STEPS - 1));
    setStepErrors([]);
  }, [step, s]);

  const back = useCallback(() =>
  {
    setStep((x) => Math.max(x - 1, 0));
    setStepErrors([]);
    setSubmitError(null);
  }, []);

  const submit = useCallback(async () =>
  {
    const e = validateStep(step, s);
    if (e.length > 0)
    {
      setStepErrors(e);
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    const fd = new FormData();
    fd.append("idempotencyKey", crypto.randomUUID());
    appendFields(fd, s);
    try
    {
      const res = await fetch("/api/contact-intake", {
        method: "POST",
        body: fd,
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok)
      {
        setSubmitError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      setDone(true);
    }
    catch
    {
      setSubmitError("Network error. Check your connection and try again.");
    }
    setSubmitting(false);
  }, [step, s]);

  if (done)
  {
    return (
      <div className="rounded-2xl border border-border/70 bg-surface p-6 text-center">
        <p className="text-sm font-medium text-foreground">Thank you.</p>
        <p className="mt-2 text-sm text-muted">
          Your intake form was sent. We will follow up using the contact information you provided.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border/70 bg-surface p-6 md:p-8">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-wide text-muted">Intake questionnaire</p>
        <h3 className="mt-1 text-lg font-semibold tracking-tight text-foreground">
          {stepTitles[step]}
        </h3>
        <div
          className="mt-3 h-1.5 overflow-hidden rounded-full bg-border/60"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Form progress"
        >
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-muted">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
      </div>

      <p className="sr-only" aria-live="polite">
        {stepTitles[step]}
      </p>

      {stepErrors.length > 0 && (
        <div
          className="mb-4 rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-foreground"
          role="alert"
        >
          <ul className="list-inside list-disc space-y-1">
            {stepErrors.map((msg) => (
              <li key={msg}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      {submitError && (
        <div
          className="mb-4 rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-foreground"
          role="alert"
        >
          {submitError}
        </div>
      )}

      <div className="space-y-5">
        {step === 0 && (
          <>
            <div>
              <label className={labelClass()} htmlFor="fullName">Full name</label>
              <input
                id="fullName"
                className={inputClass()}
                value={s.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                autoComplete="name"
              />
            </div>
            <div>
              <label className={labelClass()} htmlFor="phone">Phone number</label>
              <input
                id="phone"
                type="tel"
                className={inputClass()}
                value={s.phone}
                onChange={(e) => update("phone", e.target.value)}
                autoComplete="tel"
              />
            </div>
            <div>
              <label className={labelClass()} htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                className={inputClass()}
                value={s.email}
                onChange={(e) => update("email", e.target.value)}
                autoComplete="email"
              />
            </div>
            <div>
              <label className={labelClass()} htmlFor="streetAddress">Street address</label>
              <input
                id="streetAddress"
                className={inputClass()}
                value={s.streetAddress}
                onChange={(e) => update("streetAddress", e.target.value)}
                autoComplete="street-address"
              />
            </div>
            <div>
              <label className={labelClass()} htmlFor="birthday">Birthday</label>
              <input
                id="birthday"
                type="date"
                className={inputClass()}
                value={s.birthday}
                onChange={(e) => update("birthday", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass()} htmlFor="socialSecurity">Social Security number</label>
              <input
                id="socialSecurity"
                className={inputClass()}
                value={s.socialSecurity}
                onChange={(e) => update("socialSecurity", e.target.value)}
                autoComplete="off"
              />
            </div>
            <div>
              <label className={labelClass()} htmlFor="gender">Gender</label>
              <select
                id="gender"
                className={inputClass()}
                value={s.gender}
                onChange={(e) => update("gender", e.target.value)}
              >
                <option value="">Select…</option>
                <option value="Woman">Woman</option>
                <option value="Man">Man</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer to self-describe">Prefer to self-describe</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
            <div>
              <label className={labelClass()} htmlFor="maritalStatus">Marital status</label>
              <select
                id="maritalStatus"
                className={inputClass()}
                value={s.maritalStatus}
                onChange={(e) => update("maritalStatus", e.target.value)}
              >
                <option value="">Select…</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Domestic partnership">Domestic partnership</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
                <option value="Separated">Separated</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div>
              <label className={labelClass()} htmlFor="emergencyContactName">Emergency contact name</label>
              <input
                id="emergencyContactName"
                className={inputClass()}
                value={s.emergencyContactName}
                onChange={(e) => update("emergencyContactName", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass()} htmlFor="emergencyContactPhone">Emergency contact phone</label>
              <input
                id="emergencyContactPhone"
                type="tel"
                className={inputClass()}
                value={s.emergencyContactPhone}
                onChange={(e) => update("emergencyContactPhone", e.target.value)}
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <YesNoField
              name="tribeMember"
              label="Are you a member of a federally recognized tribe?"
              value={s.federallyRecognizedTribe}
              onChange={(v) => update("federallyRecognizedTribe", v)}
            />
            {s.federallyRecognizedTribe === "yes" && (
              <div>
                <label className={labelClass()} htmlFor="tribeName">
                  What is the name of the federally recognized tribe?
                </label>
                <input
                  id="tribeName"
                  className={inputClass()}
                  value={s.tribeName}
                  onChange={(e) => update("tribeName", e.target.value)}
                />
              </div>
            )}
          </>
        )}

        {step === 3 && (
          <>
            <div>
              <label className={labelClass()} htmlFor="cdibCard">Upload photo of your CDIB card</label>
              <input
                id="cdibCard"
                type="file"
                accept="image/*,.pdf,.heic,.heif"
                className={inputClass()}
                onChange={(e) => update("cdibCard", e.target.files?.[0] ?? null)}
              />
              <p className="mt-1 text-xs text-muted">JPEG, PNG, WebP, HEIC, or PDF. Max 6MB.</p>
            </div>
            <div>
              <label className={labelClass()} htmlFor="photoId">Upload photo of a valid photo ID</label>
              <input
                id="photoId"
                type="file"
                accept="image/*,.pdf,.heic,.heif"
                className={inputClass()}
                onChange={(e) => update("photoId", e.target.files?.[0] ?? null)}
              />
              <p className="mt-1 text-xs text-muted">JPEG, PNG, WebP, HEIC, or PDF. Max 6MB.</p>
            </div>
          </>
        )}

        {step === 4 && (
          <div>
            <label className={labelClass()} htmlFor="insurancePlanName">
              If insured, name of insurance plan
            </label>
            <input
              id="insurancePlanName"
              className={inputClass()}
              value={s.insurancePlanName}
              onChange={(e) => update("insurancePlanName", e.target.value)}
              placeholder="Leave blank if not insured"
            />
          </div>
        )}

        {step === 5 && (
          <>
            <YesNoField
              name="onSubstances"
              label="Are you currently on any substances?"
              value={s.currentlyOnSubstances}
              onChange={(v) => update("currentlyOnSubstances", v)}
            />
            {s.currentlyOnSubstances === "yes" && (
              <>
                <div>
                  <label className={labelClass()} htmlFor="substanceAbuseDuration">
                    How long have you been abusing substances?
                  </label>
                  <textarea
                    id="substanceAbuseDuration"
                    rows={2}
                    className={inputClass()}
                    value={s.substanceAbuseDuration}
                    onChange={(e) => update("substanceAbuseDuration", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass()} htmlFor="substancesCurrentlyAbusing">
                    What substances are you currently abusing?
                  </label>
                  <textarea
                    id="substancesCurrentlyAbusing"
                    rows={3}
                    className={inputClass()}
                    value={s.substancesCurrentlyAbusing}
                    onChange={(e) => update("substancesCurrentlyAbusing", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass()} htmlFor="substanceAbuseFrequency">
                    How often are you abusing any of these substances?
                  </label>
                  <textarea
                    id="substanceAbuseFrequency"
                    rows={2}
                    className={inputClass()}
                    value={s.substanceAbuseFrequency}
                    onChange={(e) => update("substanceAbuseFrequency", e.target.value)}
                  />
                </div>
              </>
            )}
            <YesNoField
              name="overdose"
              label="Have you ever overdosed?"
              value={s.everOverdosed}
              onChange={(v) => update("everOverdosed", v)}
            />
          </>
        )}

        {step === 6 && (
          <>
            <div>
              <label className={labelClass()} htmlFor="seriousHealthProblems">
                Do you have serious health problems or illnesses that need medical attention?
              </label>
              <textarea
                id="seriousHealthProblems"
                rows={3}
                className={inputClass()}
                value={s.seriousHealthProblems}
                onChange={(e) => update("seriousHealthProblems", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass()} htmlFor="prescriptionMedications">
                Are you taking any prescription medications, including psychiatric medications?
              </label>
              <textarea
                id="prescriptionMedications"
                rows={3}
                className={inputClass()}
                value={s.prescriptionMedications}
                onChange={(e) => update("prescriptionMedications", e.target.value)}
              />
            </div>
            <YesNoField
              name="relIssues"
              label="Has your substance use interfered or caused issues in your personal relationships?"
              value={s.substanceUseRelationshipIssues}
              onChange={(v) => update("substanceUseRelationshipIssues", v)}
            />
          </>
        )}

        {step === 7 && (
          <>
            <YesNoField
              name="court"
              label="Are you currently dealing with any court issue, misdemeanor, felony, or probation?"
              value={s.courtIssues}
              onChange={(v) => update("courtIssues", v)}
            />
            {s.courtIssues === "yes" && (
              <>
                <YesNoField
                  name="courtPerm"
                  label="Do you have permission from the court or your probation officer to receive treatment out of state?"
                  value={s.courtPermissionOutOfState}
                  onChange={(v) => update("courtPermissionOutOfState", v)}
                />
                <div>
                  <label className={labelClass()} htmlFor="probationOfficerName">
                    If you have a probation officer, their name
                  </label>
                  <input
                    id="probationOfficerName"
                    className={inputClass()}
                    value={s.probationOfficerName}
                    onChange={(e) => update("probationOfficerName", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass()} htmlFor="probationOfficerPhone">
                    Probation officer phone number
                  </label>
                  <input
                    id="probationOfficerPhone"
                    type="tel"
                    className={inputClass()}
                    value={s.probationOfficerPhone}
                    onChange={(e) => update("probationOfficerPhone", e.target.value)}
                  />
                </div>
              </>
            )}
          </>
        )}

        {step === 8 && (
          <>
            <YesNoField
              name="support"
              label="Do you have family or friends who support your recovery?"
              value={s.familyFriendsSupportRecovery}
              onChange={(v) => update("familyFriendsSupportRecovery", v)}
            />
            <YesNoField
              name="danger"
              label="Are you in any immediate danger to yourself or others?"
              value={s.immediateDanger}
              onChange={(v) => update("immediateDanger", v)}
            />
            <YesNoField
              name="safePlace"
              label="Are you currently living in a safe place?"
              value={s.livingInSafePlace}
              onChange={(v) => update("livingInSafePlace", v)}
            />
            <YesNoField
              name="selfHarm"
              label="Within the past two years, have you tried to seriously harm yourself or attempt suicide?"
              value={s.selfHarmSuicideAttemptTwoYears}
              onChange={(v) => update("selfHarmSuicideAttemptTwoYears", v)}
            />
            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border/80 px-4 py-3 text-sm leading-relaxed">
              <input
                type="checkbox"
                checked={s.declarationAccurate}
                onChange={(e) => update("declarationAccurate", e.target.checked)}
                className="mt-1 accent-accent"
              />
              <span>
                I declare that the information I&apos;ve provided is accurate and complete.
              </span>
            </label>
          </>
        )}
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={back}
          disabled={step === 0 || submitting}
          className="rounded-2xl border border-border/80 px-5 py-2.5 text-sm font-medium text-foreground hover:bg-card disabled:opacity-40"
        >
          Back
        </button>
        {step < TOTAL_STEPS - 1 ? (
          <button
            type="button"
            onClick={next}
            className="rounded-2xl bg-accent px-5 py-2.5 text-sm font-medium text-background ring-1 ring-accent/60 hover:brightness-105"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={submitting}
            className="rounded-2xl bg-accent px-5 py-2.5 text-sm font-medium text-background ring-1 ring-accent/60 hover:brightness-105 disabled:opacity-60"
          >
            {submitting ? "Sending…" : "Submit intake form"}
          </button>
        )}
      </div>

      <p className="mt-6 text-xs leading-relaxed text-muted">
        This form sends your answers by email for intake purposes. Do not use it for emergencies—call
        {" "}
        <a href="tel:911" className="underline hover:text-foreground">911</a>
        {" "}
        or your local crisis line if you are in immediate danger.
      </p>
    </div>
  );
}
