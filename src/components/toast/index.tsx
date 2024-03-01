import { toast } from "sonner";
import clsx from "clsx";
import { TypeToast } from "@/models/enum_models";

function Toast({
  t,
  message,
  type,
}: {
  t: any;
  message: string;
  type: TypeToast;
}) {
  return (
    <div
      className={clsx(
        "rounded-lg px-3 py-3 max-[600px]:w-full w-[356px] flex justify-between",
        { "bg-secondary text-primary": type === TypeToast.SUCCESS },
        { "bg-red-700 text-gray-300": type === TypeToast.ERROR }
      )}
    >
      <div className="">{message}</div>
      <button
        className={clsx(
          "h-6 w-6 flex justify-center items-center  rounded-full  hover:bg-opacity-80 duration-500",
          { "bg-primary text-secondary": type === TypeToast.SUCCESS },
          { "bg-gray-300 text-red-700": type === TypeToast.ERROR }
        )}
        onClick={() => toast.dismiss(t)}
      >
        <svg
          className="w-6 h-6 p-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>
  );
}

export function showToast(message: string, type: TypeToast) {
  toast.custom((t) => <Toast t={t} message={message} type={type} />, {
    duration: 5000,
  });
}
