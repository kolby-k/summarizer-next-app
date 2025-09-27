import NewSummaryForm from "@/components/NewSummaryForm";

export default function Summarize() {
  return (
    <div className="flex flex-col items-center relative">
      <h1 className="text-4xl font-bold text-red-500">Get A New Summary</h1>
      <NewSummaryForm />
    </div>
  );
}
