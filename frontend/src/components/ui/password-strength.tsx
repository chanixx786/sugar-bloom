"use client";

import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Requirement {
  label: string;
  met: boolean;
}

interface PasswordStrengthProps {
  /** The current password value from `watch("password")` */
  password: string;
  /** Extra className on the wrapper div */
  className?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function calculateStrength(pass: string): number {
  let score = 0;
  if (pass.length >= 8) score++;
  if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) score++;
  if (/\d/.test(pass)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(pass)) score++;
  return score;
}

function getStrengthLabel(score: number): string {
  if (score <= 1) return "Weak";
  if (score === 2) return "Fair";
  if (score === 3) return "Good";
  return "Strong";
}

function getSegmentColor(segmentIndex: number, score: number): string {
  // A segment is "filled" when score > segmentIndex
  if (score <= segmentIndex) return "bg-border";
  if (score === 1) return "bg-red-500";
  if (score === 2) return "bg-yellow-500";
  if (score === 3) return "bg-blue-500";
  return "bg-green-500";
}

function getLabelColor(score: number): string {
  if (score <= 1) return "text-red-500";
  if (score === 2) return "text-yellow-500";
  if (score === 3) return "text-blue-500";
  return "text-green-500";
}

function getRequirements(password: string): Requirement[] {
  return [
    { label: "At least 8 characters", met: password.length >= 8 },
    {
      label: "Uppercase & lowercase letters",
      met: /[a-z]/.test(password) && /[A-Z]/.test(password),
    },
    { label: "At least one number", met: /\d/.test(password) },
    {
      label: "At least one special character",
      met: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];
}

// ─── Component ────────────────────────────────────────────────────────────────

export function PasswordStrength({ password, className }: PasswordStrengthProps) {
  if (!password || password.length === 0) return null;

  const score = calculateStrength(password);
  const requirements = getRequirements(password);

  return (
    <div className={cn("space-y-2.5 mt-2", className)}>
      {/* Strength Bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Password strength</span>
          <span className={cn("text-xs font-semibold transition-colors", getLabelColor(score))}>
            {getStrengthLabel(score)}
          </span>
        </div>

        {/* Segmented bar — 4 equal segments */}
        <div className="flex gap-1">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-all duration-300",
                getSegmentColor(i, score)
              )}
            />
          ))}
        </div>
      </div>

      {/* Requirements checklist */}
      <ul className="space-y-1">
        {requirements.map(({ label, met }) => (
          <li key={label} className="flex items-center gap-1.5">
            {/* Checkmark / Dot */}
            <span
              className={cn(
                "inline-flex size-3.5 shrink-0 items-center justify-center rounded-full transition-colors duration-200",
                met ? "bg-green-500" : "bg-border"
              )}
            >
              {met && (
                <svg
                  viewBox="0 0 10 8"
                  fill="none"
                  className="size-2 text-white"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 4l2.5 2.5L9 1" />
                </svg>
              )}
            </span>
            <span
              className={cn(
                "text-xs transition-colors duration-200",
                met ? "text-green-600" : "text-muted-foreground"
              )}
            >
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
