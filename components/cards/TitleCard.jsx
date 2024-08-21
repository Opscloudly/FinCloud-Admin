import Link from "next/link";

export default function TitleCard({
  heading,
  badge,
  has_link,
  link_label,
  link_href,
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-x-2">
        <h2 className="text-black text-[28px] leading-[32px] font-medium">
          {heading}
        </h2>
        <div className="flex items-end">
          {badge ? (
            <p className="text-black text-xs font-medium py-1.5 px-2 rounded bg-main-600">
              {badge}
            </p>
          ) : null}
        </div>
      </div>
      {has_link && (
        <div>
          <Link
            href={link_href}
            className="text-black font-medium capitalize px-4 py-2.5 bg-main-600 rounded-md hover:opacity-90 transition-all duration-200"
          >
            {link_label}
          </Link>
        </div>
      )}
    </div>
  );
}
