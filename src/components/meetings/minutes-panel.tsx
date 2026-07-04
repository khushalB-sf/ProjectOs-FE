import { LABELS } from "@/constants/labels";
import { toAttendeeName } from "@/types/meetings";

const MEETINGS_LABELS = LABELS.MEETINGS;

interface MinutesPanelProps {
  mom: string | null;
  attendees: unknown[];
}

function MinutesPanel({ mom, attendees }: MinutesPanelProps) {
  const attendeeNames = attendees.map(toAttendeeName).filter(Boolean);

  return (
    <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-700 shadow-sm">
      {attendeeNames.length > 0 && (
        <section>
          <h3 className="mb-1 text-sm font-semibold text-slate-900">
            {MEETINGS_LABELS.MINUTES.ATTENDEES_TITLE}
          </h3>
          <p>{attendeeNames.join(", ")}</p>
        </section>
      )}

      {mom ? (
        <p className="leading-relaxed whitespace-pre-wrap">{mom}</p>
      ) : (
        <p className="text-slate-400">{MEETINGS_LABELS.MINUTES.EMPTY}</p>
      )}
    </div>
  );
}

export { MinutesPanel };
