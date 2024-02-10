import { CheckCircle2Icon, XCircleIcon } from "lucide-react";

export function SuccessMessage ( props: {message: string} ) {
  return (
    <div className="bg-green-100 text-green-700 flex gap-2 p-3 dark:bg-opacity-70 opacity-90" role="alert">
      <CheckCircle2Icon className="h-6 w-6 inline" />
      <p>{props.message}</p>
    </div>
  );
}

export function ErrorMessage (props: {message: string}) {
  return (
    <div className="bg-red-100 text-red-700 flex gap-2 p-3 dark:bg-opacity-70 opacity-90" role="alert">
      <XCircleIcon className="h-6 w-6 inline" />
      <p>{props.message}</p>
    </div>
  );
}