export default function Status({ status }) {
  if (!status) return null;
  let className = "bg-Gray-100 text-Gray-400";
  let content = "No defined";
  switch (status) {
    case "PENDING":
      content = "Pending";
      className = "bg-orange-100 text-orange-400";
      break;
    case "APPROVED":
      content = "Approved";
      className = "bg-green-100 text-green-600";
      break;
    case "DECLINED":
      content = "Declined";
      className = "bg-red-100 text-red-600";
      break;
    case "ON-HOLD":
      content = "on hold";
      className = "bg-purple-100 text-purple-400";
      break;
    case "ONGOING":
      content = "Ongoing";
      className = "bg-main-100 text-main-600";
      break;
    case "FUNDED":
      content = "Funded";
      className = "bg-cyan-100 text-cyan-400";
      break;
    case "CANCELLED":
      content = "Cancelled";
      className = "bg-red-100 text-red-600";
      break;
  }
  return (
    <span
      className={`py-0.5 px-2 rounded-2xl text-xs capitalize font-medium leading-[19px] ${className}`}
    >
      {content}
    </span>
  );
}
