interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
      <div
        className="h-3 rounded-xl bg-violet-800"
        role="progressbar"
        aria-label="Completed habits progress on this day"
        aria-valuenow={progress}
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
}
