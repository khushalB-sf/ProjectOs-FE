import { LABELS } from "@/constants/labels";
import { MEETING_MINUTES } from "@/constants/meetings/mock";

const MEETINGS_LABELS = LABELS.MEETINGS;

function MinutesPanel() {
  return (
    <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-700 shadow-sm">
      <section>
        <h3 className="mb-1 text-sm font-semibold text-slate-900">
          {MEETINGS_LABELS.MINUTES.ATTENDEES_TITLE}
        </h3>
        <p>{MEETING_MINUTES.attendees}</p>
      </section>

      <section>
        <h3 className="mb-1 text-sm font-semibold text-slate-900">
          {MEETING_MINUTES.reviewTitle}
        </h3>
        <p className="leading-relaxed">{MEETING_MINUTES.reviewBody}</p>
      </section>

      <section>
        <h3 className="mb-1 text-sm font-semibold text-slate-900">
          {MEETING_MINUTES.planningTitle}
        </h3>
        <ul className="list-disc space-y-1 pl-5">
          {MEETING_MINUTES.planningBullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="mb-1 text-sm font-semibold text-slate-900">
          {MEETING_MINUTES.riskTitle}
        </h3>
        <p className="rounded-lg bg-red-50 p-3 leading-relaxed text-red-700">
          {MEETING_MINUTES.riskBody}
        </p>
      </section>
    </div>
  );
}

export { MinutesPanel };
