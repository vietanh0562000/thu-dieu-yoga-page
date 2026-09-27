/* @ds-bundle: {"format":4,"namespace":"ThuDiUYogaDesignSystem_fdebe5","components":[{"name":"BenefitList","sourcePath":"components/cards/BenefitList.jsx"},{"name":"CarouselPager","sourcePath":"components/cards/CarouselPager.jsx"},{"name":"ClassCard","sourcePath":"components/cards/ClassCard.jsx"},{"name":"ContactChip","sourcePath":"components/content/ContactChip.jsx"},{"name":"Eyebrow","sourcePath":"components/content/Eyebrow.jsx"},{"name":"RatingPill","sourcePath":"components/content/RatingPill.jsx"},{"name":"StatGroup","sourcePath":"components/content/StatGroup.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"SubscribeField","sourcePath":"components/forms/SubscribeField.jsx"},{"name":"PlayButton","sourcePath":"components/media/PlayButton.jsx"},{"name":"NavBar","sourcePath":"components/navigation/NavBar.jsx"},{"name":"Wordmark","sourcePath":"components/navigation/Wordmark.jsx"},{"name":"Dialog","sourcePath":"components/overlays/Dialog.jsx"},{"name":"Toast","sourcePath":"components/overlays/Toast.jsx"}],"sourceHashes":{"components/cards/BenefitList.jsx":"7c811f44d8cf","components/cards/CarouselPager.jsx":"7060c0207b46","components/cards/ClassCard.jsx":"b954095aba0b","components/content/ContactChip.jsx":"d39da3564b59","components/content/Eyebrow.jsx":"c9b4284981b6","components/content/RatingPill.jsx":"1a086b2e4bb1","components/content/StatGroup.jsx":"f4a1a6a51d01","components/core/Button.jsx":"fb0e752cd98c","components/core/Icon.jsx":"405d99d9bec4","components/core/IconButton.jsx":"53827f2ec6da","components/forms/Input.jsx":"42d20603b387","components/forms/SubscribeField.jsx":"1a809eab2427","components/media/PlayButton.jsx":"15af253aef06","components/navigation/NavBar.jsx":"cf91d8650c42","components/navigation/Wordmark.jsx":"168fc6e00a39","components/overlays/Dialog.jsx":"c7a16b941876","components/overlays/Toast.jsx":"18174a7fa21e","ui_kits/website/Classes.jsx":"f8f14368242f","ui_kits/website/Contact.jsx":"92d52e1dc670","ui_kits/website/Footer.jsx":"e8e67e0e6478","ui_kits/website/Hero.jsx":"1a434bb89dc5","ui_kits/website/Instructor.jsx":"e26fa63cb0ad","ui_kits/website/VideoSection.jsx":"e0028e165564"},"inlinedExternals":[],"unexposedExports":[{"name":"iconUrl","sourcePath":"components/core/Icon.jsx"}]} */

(() => {

const __ds_ns = (window.ThuDiUYogaDesignSystem_fdebe5 = window.ThuDiUYogaDesignSystem_fdebe5 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/cards/BenefitList.jsx
try { (() => {
const {
  useState
} = React;
function BenefitList({
  items = [],
  defaultIndex = 0,
  onChange,
  style
}) {
  const [a, setA] = useState(defaultIndex);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      ...style
    }
  }, items.map((it, i) => i === a ? /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: 'var(--surface-tint)',
      borderRadius: 'var(--radius-sm)',
      padding: '26px 26px 30px',
      border: '1px solid #eef4eb'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 500,
      letterSpacing: '-0.03em',
      color: 'var(--ink-900)'
    }
  }, it.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      lineHeight: 1.5,
      letterSpacing: '-0.03em',
      color: 'var(--text-body)',
      marginTop: 14,
      maxWidth: 460
    }
  }, it.body)) : /*#__PURE__*/React.createElement("button", {
    key: i,
    type: "button",
    onClick: () => {
      setA(i);
      onChange && onChange(i);
    },
    style: {
      all: 'unset',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 30,
      height: 90,
      borderBottom: i < items.length - 1 && i + 1 !== a ? '1px solid var(--line)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-number)',
      letterSpacing: '-0.03em',
      color: 'var(--sage-600)',
      minWidth: 40
    }
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-h4)',
      letterSpacing: '-0.03em',
      color: 'var(--sage-600)'
    }
  }, it.title))));
}
Object.assign(__ds_scope, { BenefitList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/BenefitList.jsx", error: String((e && e.message) || e) }); }

// components/cards/CarouselPager.jsx
try { (() => {
function CarouselPager({
  count = 3,
  index = 0,
  onChange,
  width = 186,
  style
}) {
  const seg = width / count;
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      position: 'relative',
      width,
      height: 7,
      borderRadius: 999,
      background: 'var(--paper-2)',
      border: '1px solid var(--line)',
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 1,
      height: 3,
      width: Math.min(70, seg),
      left: seg * index + (seg - Math.min(70, seg)) / 2,
      borderRadius: 999,
      background: 'var(--ink-900)',
      transition: 'left var(--dur-base) var(--ease-out)'
    }
  }), Array.from({
    length: count
  }).map((_, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    "aria-label": 'Slide ' + (i + 1),
    onClick: () => onChange && onChange(i),
    style: {
      all: 'unset',
      cursor: 'pointer',
      position: 'absolute',
      top: -8,
      bottom: -8,
      left: seg * i,
      width: seg
    }
  })));
}
Object.assign(__ds_scope, { CarouselPager });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/CarouselPager.jsx", error: String((e && e.message) || e) }); }

// components/content/Eyebrow.jsx
try { (() => {
function Eyebrow({
  children,
  tone = 'dark',
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-eyebrow)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--ls-eyebrow)',
      color: tone === 'light' ? 'var(--white)' : 'var(--ink-900)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/content/StatGroup.jsx
try { (() => {
function StatGroup({
  items = [],
  tone = 'light',
  style
}) {
  const light = tone === 'light';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      ...style
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: '0 22px',
      textAlign: 'center',
      borderLeft: i ? `1px solid ${light ? 'rgba(253,255,252,.22)' : 'var(--line)'}` : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-stat)',
      fontWeight: 500,
      letterSpacing: '-0.02em',
      lineHeight: 1,
      color: light ? 'var(--white)' : 'var(--forest-800)'
    }
  }, it.value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      marginTop: 18,
      letterSpacing: '-0.02em',
      whiteSpace: 'nowrap',
      color: light ? 'var(--text-on-dark-muted)' : 'var(--gray-500)'
    }
  }, it.label))));
}
Object.assign(__ds_scope, { StatGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/StatGroup.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const PH = 'https://unpkg.com/@phosphor-icons/core@2.1.1/assets/';
const SI = 'https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/';
function iconUrl(name, set) {
  if (set === 'brand') return SI + name + '.svg';
  if (set === 'fill') return PH + 'fill/' + name + '-fill.svg';
  return PH + 'regular/' + name + '.svg';
}
function Icon({
  name,
  set = 'regular',
  size = 20,
  color = 'currentColor',
  style,
  ...rest
}) {
  const url = iconUrl(name, set);
  return /*#__PURE__*/React.createElement("span", _extends({
    "aria-hidden": "true"
  }, rest, {
    style: {
      display: 'inline-block',
      flex: 'none',
      width: size,
      height: size,
      backgroundColor: color,
      WebkitMask: `url(${url}) center/contain no-repeat`,
      mask: `url(${url}) center/contain no-repeat`,
      ...style
    }
  }));
}
Object.assign(__ds_scope, { iconUrl, Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/content/ContactChip.jsx
try { (() => {
function ContactChip({
  icon = 'phone',
  children,
  href,
  style
}) {
  const Tag = href ? 'a' : 'div';
  return /*#__PURE__*/React.createElement(Tag, {
    href: href,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 18,
      color: 'var(--white)',
      textDecoration: 'none',
      fontSize: 17,
      letterSpacing: '-0.01em',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 66,
      height: 66,
      borderRadius: 999,
      background: 'rgba(253,255,252,.28)',
      backdropFilter: 'var(--blur-glass)',
      WebkitBackdropFilter: 'var(--blur-glass)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    set: "fill",
    size: 22,
    color: "var(--white)"
  })), children);
}
Object.assign(__ds_scope, { ContactChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ContactChip.jsx", error: String((e && e.message) || e) }); }

// components/content/RatingPill.jsx
try { (() => {
function RatingPill({
  avatarsSrc,
  count = '124+',
  rating = '4.9/5',
  stars = 5,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 18,
      padding: '4px 14px 4px 4px',
      borderRadius: 999,
      border: '1px solid rgba(253,255,252,.55)',
      background: 'rgba(253,255,252,.12)',
      backdropFilter: 'var(--blur-glass)',
      WebkitBackdropFilter: 'var(--blur-glass)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 44,
      display: 'flex',
      alignItems: 'center'
    }
  }, avatarsSrc ? /*#__PURE__*/React.createElement("img", {
    src: avatarsSrc,
    alt: "",
    style: {
      height: 44,
      display: 'block',
      borderRadius: 999
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex'
    }
  }, [0, 1, 2, 3].map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 40,
      height: 40,
      borderRadius: 999,
      background: 'var(--sage-200)',
      border: '2px solid var(--white)',
      marginLeft: i ? -12 : 0
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 999,
      background: 'var(--forest-800)',
      color: '#fff',
      fontSize: 11,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: -12,
      border: '2px solid var(--white)'
    }
  }, count))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 24,
      fontWeight: 500,
      letterSpacing: '-0.03em',
      color: 'var(--white)'
    }
  }, rating), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 2
    }
  }, Array.from({
    length: stars
  }).map((_, i) => /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    key: i,
    name: "star",
    set: "fill",
    size: 21,
    color: "var(--star)"
  }))));
}
Object.assign(__ds_scope, { RatingPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/RatingPill.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
const SIZES = {
  sm: {
    height: 40,
    padding: '0 24px',
    fontSize: 15,
    borderRadius: 8,
    fontWeight: 500
  },
  md: {
    height: 46,
    padding: '0 20px',
    fontSize: 16,
    borderRadius: 6,
    fontWeight: 600
  },
  lg: {
    height: 60,
    padding: '0 34px',
    fontSize: 20,
    borderRadius: 10,
    fontWeight: 500
  }
};
const VARIANTS = {
  primary: {
    bg: 'var(--action-primary)',
    hover: 'var(--action-primary-hover)',
    color: 'var(--action-primary-text)',
    border: '1px solid #93b68f'
  },
  dark: {
    bg: 'var(--action-dark)',
    hover: 'var(--action-dark-hover)',
    color: 'var(--white)',
    border: '1px solid var(--action-dark)'
  },
  light: {
    bg: 'var(--white)',
    hover: 'var(--sage-50)',
    color: 'var(--ink-900)',
    border: '1px solid var(--white)'
  },
  tint: {
    bg: 'var(--sage-100)',
    hover: 'var(--white)',
    color: 'var(--ink-900)',
    border: '1px solid var(--sage-100)'
  },
  'outline-light': {
    bg: 'transparent',
    hover: 'rgba(253,255,252,.12)',
    color: 'var(--white)',
    border: '1px solid var(--border-on-dark)'
  },
  outline: {
    bg: 'transparent',
    hover: 'var(--sage-50)',
    color: 'var(--forest-800)',
    border: '1px solid var(--forest-800)'
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconRight,
  disabled = false,
  children,
  style,
  onClick,
  type = 'button',
  ...rest
}) {
  const [h, setH] = useState(false);
  const [p, setP] = useState(false);
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size] || SIZES.md;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => {
      setH(false);
      setP(false);
    },
    onMouseDown: () => setP(true),
    onMouseUp: () => setP(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      boxSizing: 'border-box',
      fontFamily: 'var(--font-sans)',
      letterSpacing: '-0.03em',
      lineHeight: 1,
      whiteSpace: 'nowrap',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? .45 : 1,
      width: fullWidth ? '100%' : undefined,
      ...s,
      background: h && !disabled ? v.hover : v.bg,
      color: v.color,
      border: v.border,
      transform: p && !disabled ? 'scale(.98)' : 'none',
      transition: 'background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)',
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: s.fontSize + 2
  }), children, iconRight && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: s.fontSize + 2
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
const V = {
  dark: {
    bg: 'var(--ink-900)',
    hover: 'var(--forest-800)',
    color: 'var(--white)',
    radius: 10,
    border: 'none'
  },
  glass: {
    bg: 'rgba(253,255,252,.28)',
    hover: 'rgba(253,255,252,.4)',
    color: 'var(--white)',
    radius: 999,
    border: 'none',
    blur: true
  },
  light: {
    bg: 'var(--white)',
    hover: 'var(--sage-50)',
    color: 'var(--ink-900)',
    radius: 10,
    border: '1px solid var(--line)'
  }
};
function IconButton({
  icon = 'arrow-right',
  iconSet = 'regular',
  variant = 'dark',
  size = 58,
  label,
  onClick,
  style,
  ...rest
}) {
  const [h, setH] = useState(false);
  const v = V[variant] || V.dark;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label || icon,
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      width: size,
      height: size,
      flex: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: v.border,
      borderRadius: v.radius,
      background: h ? v.hover : v.bg,
      color: v.color,
      cursor: 'pointer',
      padding: 0,
      backdropFilter: v.blur ? 'var(--blur-glass)' : undefined,
      WebkitBackdropFilter: v.blur ? 'var(--blur-glass)' : undefined,
      transition: 'background var(--dur-fast) var(--ease-out)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    set: iconSet,
    size: Math.round(size * .38)
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/cards/ClassCard.jsx
try { (() => {
const {
  useState
} = React;
function ClassCard({
  image,
  location = 'In Studio',
  title = 'Morning Flow',
  onOpen,
  style
}) {
  const [h, setH] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      border: '1px solid var(--border-card)',
      borderRadius: 'var(--radius-xs)',
      overflow: 'hidden',
      background: 'var(--sage-100)',
      display: 'flex',
      flexDirection: 'column',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '611 / 348',
      overflow: 'hidden',
      background: 'var(--sage-200)'
    }
  }, image && /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: title,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
      transform: h ? 'scale(1.03)' : 'none',
      transition: 'transform var(--dur-slow) var(--ease-out)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      padding: '15px 24px 14px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--sage-700)',
      letterSpacing: '-0.01em'
    }
  }, location), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-h3)',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      color: 'var(--ink-900)',
      marginTop: 2
    }
  }, title)), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "arrow-right",
    label: 'Open ' + title,
    onClick: onOpen
  })));
}
Object.assign(__ds_scope, { ClassCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/ClassCard.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
function Input({
  tone = 'glass',
  multiline = false,
  rows = 4,
  placeholder,
  value,
  onChange,
  type = 'text',
  name,
  style,
  ...rest
}) {
  const [f, setF] = useState(false);
  const glass = tone === 'glass';
  const base = {
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: 'var(--font-sans)',
    fontSize: 18,
    letterSpacing: '-0.01em',
    borderRadius: 10,
    outline: 'none',
    padding: multiline ? '22px 24px' : '0 24px',
    height: multiline ? undefined : 60,
    minHeight: multiline ? 158 : undefined,
    resize: 'none',
    background: glass ? f ? 'rgba(253,255,252,.08)' : 'transparent' : 'var(--white)',
    color: glass ? 'var(--white)' : 'var(--ink-900)',
    border: glass ? `1px solid ${f ? 'var(--white)' : 'var(--border-on-dark)'}` : `1px solid ${f ? 'var(--sage-600)' : 'var(--line)'}`,
    transition: 'border-color var(--dur-fast), background var(--dur-fast)',
    ...style
  };
  const props = {
    name,
    placeholder,
    value,
    onChange,
    onFocus: () => setF(true),
    onBlur: () => setF(false),
    className: glass ? 'tdy-input-glass' : undefined,
    style: base,
    ...rest
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, glass && /*#__PURE__*/React.createElement("style", null, '.tdy-input-glass::placeholder{color:var(--white);opacity:1}'), multiline ? /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows
  }, props)) : /*#__PURE__*/React.createElement("input", _extends({
    type: type
  }, props)));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/SubscribeField.jsx
try { (() => {
const {
  useState
} = React;
function SubscribeField({
  placeholder = 'Email',
  buttonLabel = 'Subscribe Now',
  onSubscribe,
  style
}) {
  const [v, setV] = useState('');
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      onSubscribe && onSubscribe(v);
      setV('');
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: 3,
      borderRadius: 10,
      border: '1px solid rgba(253,255,252,.4)',
      boxSizing: 'border-box',
      width: '100%',
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "email",
    value: v,
    onChange: e => setV(e.target.value),
    placeholder: placeholder,
    style: {
      flex: 1,
      minWidth: 0,
      background: 'transparent',
      border: 'none',
      outline: 'none',
      color: 'var(--white)',
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      padding: '0 14px',
      height: 40
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    type: "submit",
    variant: "primary",
    size: "sm"
  }, buttonLabel));
}
Object.assign(__ds_scope, { SubscribeField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SubscribeField.jsx", error: String((e && e.message) || e) }); }

// components/media/PlayButton.jsx
try { (() => {
const {
  useState
} = React;
function PlayButton({
  size = 420,
  onClick,
  style
}) {
  const [h, setH] = useState(false);
  const glass = size * .915,
    dark = size * .37;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: size,
      height: size,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 999,
      border: '1px dashed rgba(253,255,252,.7)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      width: glass,
      height: glass,
      borderRadius: 999,
      background: 'rgba(200,215,200,.28)',
      backdropFilter: 'blur(2px)',
      WebkitBackdropFilter: 'blur(2px)'
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Play video",
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      position: 'relative',
      width: dark,
      height: dark,
      borderRadius: 999,
      border: 'none',
      background: 'var(--ink-900)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transform: h ? 'scale(1.05)' : 'none',
      transition: 'transform var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "play",
    set: "fill",
    size: Math.max(16, dark * .11),
    color: "var(--sage-300)",
    style: {
      marginLeft: 3
    }
  })));
}
Object.assign(__ds_scope, { PlayButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/media/PlayButton.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Wordmark.jsx
try { (() => {
function Wordmark({
  tone = 'dark',
  name = 'Thu Diệu Yoga',
  tagline = 'Meditation and yoga',
  scale = 1,
  style
}) {
  const c = tone === 'light' ? 'var(--white)' : 'var(--ink-900)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      lineHeight: 1,
      color: c,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 17 * scale,
      fontWeight: 500,
      letterSpacing: '-0.05em',
      whiteSpace: 'nowrap'
    }
  }, name), tagline && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 7 * scale,
      fontWeight: 600,
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      marginTop: 3 * scale,
      whiteSpace: 'nowrap'
    }
  }, tagline));
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavBar.jsx
try { (() => {
const {
  useState
} = React;
const glass = {
  background: 'rgba(253,255,252,.42)',
  backdropFilter: 'var(--blur-glass)',
  WebkitBackdropFilter: 'var(--blur-glass)',
  border: '1px solid rgba(253,255,252,.35)'
};
function NavLink({
  label,
  active,
  onClick
}) {
  const [h, setH] = useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onClick && onClick();
    },
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      font: 'var(--type-nav)',
      textTransform: 'uppercase',
      color: 'var(--forest-900)',
      textDecoration: 'none',
      opacity: active || h ? 1 : .82,
      borderBottom: active ? '1px solid var(--forest-900)' : '1px solid transparent',
      paddingBottom: 2
    }
  }, label);
}
function NavBar({
  links = ['About', 'Classes', 'Videos', 'Testimonials', 'Contact'],
  active,
  onNavigate,
  ctaLabel = 'Book a Free class',
  onCta,
  style
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 24,
      ...style
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate && onNavigate('home');
    },
    style: {
      ...glass,
      display: 'inline-flex',
      alignItems: 'center',
      height: 54,
      padding: '0 24px',
      borderRadius: 999,
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Wordmark, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      ...glass,
      display: 'flex',
      alignItems: 'center',
      gap: 42,
      height: 50,
      padding: '0 26px',
      borderRadius: 12
    }
  }, links.map(l => /*#__PURE__*/React.createElement(NavLink, {
    key: l,
    label: l,
    active: active === l,
    onClick: () => onNavigate && onNavigate(l)
  }))), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "dark",
    size: "md",
    onClick: onCta
  }, ctaLabel));
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavBar.jsx", error: String((e && e.message) || e) }); }

// components/overlays/Dialog.jsx
try { (() => {
function Dialog({
  open,
  title,
  onClose,
  children,
  width = 520
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(20,26,18,.45)',
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation(),
    style: {
      width: '100%',
      maxWidth: width,
      background: 'var(--paper)',
      borderRadius: 'var(--radius-sm)',
      boxShadow: 'var(--shadow-float)',
      padding: '36px 36px 34px',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    variant: "light",
    size: 40,
    label: "Close",
    onClick: onClose,
    style: {
      position: 'absolute',
      top: 20,
      right: 20
    }
  }), title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-h2)',
      letterSpacing: 'var(--ls-heading)',
      color: 'var(--forest-800)',
      lineHeight: 1.15,
      marginBottom: 22,
      paddingRight: 48
    }
  }, title), children));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlays/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/overlays/Toast.jsx
try { (() => {
function Toast({
  open = true,
  children,
  style
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      background: 'var(--ink-900)',
      color: 'var(--white)',
      borderRadius: 10,
      padding: '14px 20px 14px 16px',
      fontSize: 16,
      letterSpacing: '-0.02em',
      boxShadow: 'var(--shadow-float)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 999,
      background: 'var(--sage-300)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 16,
    color: "var(--ink-900)"
  })), children);
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlays/Toast.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Classes.jsx
try { (() => {
function Classes({
  onOpen
}) {
  const {
    Eyebrow,
    ClassCard,
    CarouselPager
  } = window.ThuDiUYogaDesignSystem_fdebe5;
  const classes = [{
    img: 'class-morning-flow',
    loc: 'In Studio',
    title: 'Morning Flow'
  }, {
    img: 'class-gentle-stretch',
    loc: 'Online',
    title: 'Gentle Stretch'
  }, {
    img: 'class-gentle-stretch',
    loc: 'In Studio',
    title: 'Evening Restore'
  }, {
    img: 'class-morning-flow',
    loc: 'Online',
    title: 'Breath & Balance'
  }];
  const [page, setPage] = React.useState(0);
  const pages = Math.ceil(classes.length / 2);
  return /*#__PURE__*/React.createElement("section", {
    id: "classes",
    "data-screen-label": "Classes",
    style: {
      padding: '150px var(--gutter) 130px'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Classes"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '24px 0 0',
      fontSize: 'var(--fs-h2)',
      fontWeight: 400,
      letterSpacing: 'var(--ls-heading)',
      color: 'var(--forest-800)'
    }
  }, "Weekly Class Schedule"), /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: 'hidden',
      marginTop: 60
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 26,
      transform: `translateX(calc(${-page} * (100% + 26px)))`,
      transition: 'transform var(--dur-slow) var(--ease-out)'
    }
  }, classes.map((c, i) => /*#__PURE__*/React.createElement(ClassCard, {
    key: i,
    image: '../../assets/images/' + c.img + '.png',
    location: c.loc,
    title: c.title,
    onOpen: () => onOpen(c.title),
    style: {
      flex: '0 0 calc(50% - 13px)'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 58
    }
  }, /*#__PURE__*/React.createElement(CarouselPager, {
    count: pages,
    index: page,
    onChange: setPage
  })));
}
window.Classes = Classes;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Classes.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Contact.jsx
try { (() => {
function Contact({
  onSent
}) {
  const {
    Eyebrow,
    Input,
    Button,
    ContactChip
  } = window.ThuDiUYogaDesignSystem_fdebe5;
  const [f, setF] = React.useState({
    name: '',
    phone: '',
    email: '',
    msg: ''
  });
  const set = k => e => setF({
    ...f,
    [k]: e.target.value
  });
  return /*#__PURE__*/React.createElement("section", {
    id: "contact",
    "data-screen-label": "Contact",
    style: {
      position: 'relative',
      minHeight: 1062,
      overflow: 'hidden',
      padding: '322px var(--gutter) 140px',
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) 545px',
      gap: 60
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/images/contact-hands.png",
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center top',
      filter: 'blur(1px)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg,rgba(30,40,38,.05) 0%,rgba(30,44,40,.45) 40%,rgba(70,92,70,.9) 85%,#5a6f57 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "light"
  }, "Contact"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 78,
      color: 'var(--white)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 32,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 'var(--fs-display-xl)',
      fontWeight: 300,
      lineHeight: .94,
      letterSpacing: '-0.05em',
      whiteSpace: 'nowrap'
    }
  }, "Let\u2019s"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '30px 0 0',
      fontSize: 16,
      lineHeight: 1.5,
      width: 200,
      flex: 'none'
    }
  }, "Let\u2019s stay connected \u2014 your journey to balance starts here.")), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      fontSize: 'var(--fs-display-xl)',
      fontWeight: 300,
      lineHeight: .94,
      letterSpacing: '-0.05em',
      whiteSpace: 'nowrap'
    }
  }, "Connect")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 52,
      marginTop: 190,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(ContactChip, {
    icon: "phone",
    href: "tel:+15557891011"
  }, "+1 (555) 789-1011"), /*#__PURE__*/React.createElement(ContactChip, {
    icon: "envelope-simple",
    href: "mailto:hello@yogawithluna.com"
  }, "hello@yogawithluna.com"))), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      onSent();
      setF({
        name: '',
        phone: '',
        email: '',
        msg: ''
      });
    },
    style: {
      position: 'relative',
      alignSelf: 'start',
      background: 'rgba(70,82,73,.62)',
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      borderRadius: 'var(--radius-sm)',
      padding: '58px 34px 58px',
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Name",
    value: f.name,
    onChange: set('name')
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Phone Number",
    value: f.phone,
    onChange: set('phone')
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Email",
    type: "email",
    value: f.email,
    onChange: set('email')
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Message",
    multiline: true,
    value: f.msg,
    onChange: set('msg')
  }), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    variant: "tint",
    size: "lg",
    fullWidth: true,
    style: {
      marginTop: 8,
      fontWeight: 600,
      fontSize: 19,
      borderRadius: 8
    }
  }, "Send Message")));
}
window.Contact = Contact;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Contact.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Footer.jsx
try { (() => {
function Footer({
  onNav,
  onSubscribed
}) {
  const {
    Wordmark,
    SubscribeField,
    Icon
  } = window.ThuDiUYogaDesignSystem_fdebe5;
  const h = {
    fontSize: 17,
    letterSpacing: '-0.03em',
    color: 'var(--white)',
    marginBottom: 44
  };
  const link = {
    color: 'var(--white)',
    fontSize: 15,
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: 18
  };
  return /*#__PURE__*/React.createElement("footer", {
    "data-screen-label": "Footer",
    style: {
      background: 'var(--ink-900)',
      padding: '74px var(--gutter) 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.45fr 1fr 1fr 1.65fr',
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Wordmark, {
    tone: "light",
    scale: 1.05
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '46px 0 0',
      fontSize: 15,
      lineHeight: 1.45,
      letterSpacing: '-0.04em',
      color: 'var(--white)',
      maxWidth: 230
    }
  }, "Helping you reconnect with your body, calm your mind, and discover harmony in every breath.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: h
  }, "Quick Links"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, ['Classes', 'Pricing', 'Contact'].map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    style: link,
    onClick: e => {
      e.preventDefault();
      onNav(l);
    }
  }, l)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: h
  }, "Follow Me"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, [['facebook', 'Facebook'], ['instagram', 'Instagram'], ['x', 'X']].map(([i, l]) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: "#",
    style: link
  }, /*#__PURE__*/React.createElement(Icon, {
    name: i,
    set: "brand",
    size: 19,
    color: "var(--white)"
  }), l)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: h
  }, "Get the latest update"), /*#__PURE__*/React.createElement(SubscribeField, {
    onSubscribe: onSubscribed
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid rgba(253,255,252,.18)',
      marginTop: 56
    }
  }));
}
window.Footer = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
function Hero({
  onNav,
  onBook
}) {
  const {
    NavBar,
    RatingPill,
    StatGroup,
    Button
  } = window.ThuDiUYogaDesignSystem_fdebe5;
  return /*#__PURE__*/React.createElement("section", {
    id: "home",
    "data-screen-label": "Hero",
    style: {
      position: 'relative',
      minHeight: 990,
      overflow: 'hidden',
      background: '#4a6648',
      margin: '10px 10px 0',
      borderRadius: '14px 14px 0 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(120% 90% at 20% 20%,#7f9c73 0%,#56724f 45%,#3f5a41 100%)'
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/images/hero-meditation.png",
    alt: "",
    style: {
      position: 'absolute',
      right: 0,
      top: 0,
      height: '100%',
      width: '62%',
      objectFit: 'cover',
      objectPosition: 'center top',
      WebkitMaskImage: 'linear-gradient(90deg,transparent 0%,#000 30%)',
      maskImage: 'linear-gradient(90deg,transparent 0%,#000 30%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg,rgba(64,89,64,0) 45%,rgba(64,89,64,.9) 85%,#405940 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      padding: '28px var(--gutter) 0'
    }
  }, /*#__PURE__*/React.createElement(NavBar, {
    onNavigate: onNav,
    onCta: onBook
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      padding: '258px var(--gutter) 130px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760
    }
  }, /*#__PURE__*/React.createElement(RatingPill, {
    avatarsSrc: "../../assets/images/student-avatars.png"
  }), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '50px 0 0',
      fontSize: 'var(--fs-display)',
      lineHeight: 'var(--lh-display)',
      letterSpacing: 'var(--ls-display)',
      fontWeight: 500,
      color: 'var(--white)',
      whiteSpace: 'nowrap'
    }
  }, "Find Your", /*#__PURE__*/React.createElement("br", null), "Inner Balance"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '40px 0 0',
      fontSize: 'var(--fs-lead)',
      lineHeight: 1.52,
      letterSpacing: '-0.04em',
      color: 'var(--white)',
      maxWidth: 660
    }
  }, "Reconnect with your body and mind through mindful yoga sessions designed for all levels."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18,
      marginTop: 52
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "light",
    size: "lg",
    onClick: () => onNav('Classes')
  }, "Join Class Now"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline-light",
    size: "lg",
    onClick: () => onNav('Videos')
  }, "Watch Demo"))), /*#__PURE__*/React.createElement(StatGroup, {
    items: [{
      value: '125+',
      label: 'Happy Students'
    }, {
      value: '4.9/5',
      label: 'Students Rating'
    }, {
      value: '10+',
      label: 'Years of Expertise'
    }],
    style: {
      position: 'absolute',
      right: 'var(--gutter)',
      bottom: 140
    }
  })));
}
window.Hero = Hero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Instructor.jsx
try { (() => {
function Instructor({
  onBook
}) {
  const {
    Eyebrow,
    BenefitList,
    Button
  } = window.ThuDiUYogaDesignSystem_fdebe5;
  const items = [{
    title: 'Calms The Mind',
    body: 'Yoga encourages mindfulness through gentle movement and deep breathing, helping quiet racing thoughts and reduce mental clutter.'
  }, {
    title: 'Flexibility & balance',
    body: 'Steady, gradual practice opens tight muscles and joints, improving posture and stability over time.'
  }, {
    title: 'Builds emotional resilience',
    body: 'Breath-led movement teaches you to stay steady and present when life feels stressful.'
  }, {
    title: 'Deepens connection',
    body: 'Each session brings body, breath and attention back together, on and off the mat.'
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "about",
    "data-screen-label": "Instructor",
    style: {
      padding: '150px var(--gutter)',
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
      gap: 84,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Meet your instructor"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '62px 0 0',
      fontSize: 'var(--fs-h2)',
      lineHeight: 1.23,
      letterSpacing: 'var(--ls-heading)',
      color: 'var(--forest-800)',
      maxWidth: 560
    }
  }, "Hi, I\u2019m your Instructor Luna, a certified yoga instructor with over 10 year ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, "of experience helping people find calm, strength, and balance through mindful movement.")), /*#__PURE__*/React.createElement(BenefitList, {
    items: items,
    style: {
      marginTop: 52,
      maxWidth: 560
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: onBook,
    style: {
      marginTop: 56
    }
  }, "Book a Free class")), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/images/instructor-luna.png",
    alt: "Instructor Luna",
    style: {
      width: '100%',
      aspectRatio: '610 / 802',
      objectFit: 'cover',
      borderRadius: 'var(--radius-xs)',
      display: 'block'
    }
  }));
}
window.Instructor = Instructor;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Instructor.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/VideoSection.jsx
try { (() => {
function VideoSection({
  onPlay
}) {
  const {
    PlayButton
  } = window.ThuDiUYogaDesignSystem_fdebe5;
  return /*#__PURE__*/React.createElement("section", {
    id: "videos",
    "data-screen-label": "Video",
    style: {
      position: 'relative',
      height: 1258,
      margin: '0 10px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/images/hero-meditation.png",
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      filter: 'saturate(.9)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(40,55,40,.12)'
    }
  }), /*#__PURE__*/React.createElement(PlayButton, {
    size: 590,
    onClick: onPlay,
    style: {
      position: 'relative'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      marginTop: 60,
      font: 'var(--type-eyebrow)',
      fontSize: 22,
      textTransform: 'uppercase',
      letterSpacing: '-0.05em',
      color: 'var(--white)'
    }
  }, "Practice anytime, anywhere"));
}
window.VideoSection = VideoSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/VideoSection.jsx", error: String((e && e.message) || e) }); }

__ds_ns.BenefitList = __ds_scope.BenefitList;

__ds_ns.CarouselPager = __ds_scope.CarouselPager;

__ds_ns.ClassCard = __ds_scope.ClassCard;

__ds_ns.ContactChip = __ds_scope.ContactChip;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.RatingPill = __ds_scope.RatingPill;

__ds_ns.StatGroup = __ds_scope.StatGroup;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.SubscribeField = __ds_scope.SubscribeField;

__ds_ns.PlayButton = __ds_scope.PlayButton;

__ds_ns.NavBar = __ds_scope.NavBar;

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

})();
