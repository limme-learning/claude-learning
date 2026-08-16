import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@ui-kit/ui/base-components/progress"

export default function Pattern() {
  return (
    <div className="mx-auto w-full max-w-xs">
      <Progress value={56}>
        <ProgressLabel>Upload progress</ProgressLabel>
        <ProgressValue />
      </Progress>
    </div>
  )
}
