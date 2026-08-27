export default function Icon({ name, size = 20, strokeWidth = 1.8, className = "" }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": true,
  };

  const paths = {
    bag: <><path d="M6 8h12l1 13H5L6 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></>,
    heart: <path d="M20.8 8.8c0 5.5-8.8 10.2-8.8 10.2S3.2 14.3 3.2 8.8A4.8 4.8 0 0 1 12 6.2a4.8 4.8 0 0 1 8.8 2.6Z"/>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    menu: <><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></>,
    close: <><path d="m6 6 12 12"/><path d="m18 6-12 12"/></>,
    plus: <><path d="M12 5v14"/><path d="M5 12h14"/></>,
    minus: <path d="M5 12h14"/>,
    trash: <><path d="M4 7h16"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M7 7l1 13h8l1-13"/><path d="M9 7V4h6v3"/></>,
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    chevronLeft: <path d="m15 18-6-6 6-6"/>,
    chevronRight: <path d="m9 18 6-6-6-6"/>,
    leaf: <><path d="M20 4C11 4 5 8 5 15c0 3 2 5 5 5 7 0 10-6 10-16Z"/><path d="M4 20c3-4 7-7 12-9"/></>,
    sparkle: <path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z"/>,
    shield: <><path d="M12 3 20 6v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6l8-3Z"/><path d="m9 12 2 2 4-4"/></>,
    truck: <><path d="M3 6h11v10H3z"/><path d="M14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></>,
    flower: <><path d="M12 20v-5"/><path d="M12 15c-4 0-6-2-6-5 0-2 2-3 4-2 0-2 1-4 3-4s3 2 3 4c2-1 4 0 4 2 0 3-2 5-6 5Z"/><path d="M8 20h8"/></>,
    makeup: <><path d="M9 4h6l1 17H8L9 4Z"/><path d="M10 8h4"/><path d="M8 18h8"/></>,
    soap: <><rect x="4" y="7" width="16" height="11" rx="3"/><path d="M8 7c0-2 2-3 4-3s4 1 4 3"/><path d="M8 12h.01"/><path d="M12 12h.01"/></>,
    candle: <><path d="M7 9h10v11H7z"/><path d="M10 9c-1-2 2-3 2-6 3 2 3 4 2 6"/><path d="M9 20h6"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    whatsapp: <><path d="M20 11.5a8 8 0 0 1-11.7 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z"/><path d="M9 9.5c.4 1.5 1.4 2.7 2.8 3.4l1 .4c.5.2 1-.1 1.2-.5l.4-.7"/></>,
  };

  return <svg {...common}>{paths[name] || paths.sparkle}</svg>;
}
