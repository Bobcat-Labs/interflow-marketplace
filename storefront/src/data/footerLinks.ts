type FooterLink = {
  label: string
  path: string
  external?: boolean
}

type FooterLinks = {
  support: FooterLink[]
  ecosystem: FooterLink[]
  connect: FooterLink[]
}

const footerLinks: FooterLinks = {
  support: [
    { label: "FAQs", path: "/" },
    { label: "Documentation", path: "https://docs.mercurjs.com", external: true },
    { label: "Track Order", path: "/" },
    { label: "Returns", path: "/" },
    { label: "Contact", path: "/" },
  ],
  ecosystem: [
    { label: "About Interflow", path: "/" },
    { label: "Holochain", path: "https://holochain.org", external: true },
    { label: "Holo Hosting", path: "https://holo.host", external: true },
    { label: "Partners", path: "/" },
    { label: "Blog", path: "/" },
  ],
  connect: [
    { label: "Discord", path: "https://discord.gg/holochain" },
    { label: "GitHub", path: "https://github.com/holochain" },
    { label: "Twitter / X", path: "https://x.com/holochain" },
    { label: "LinkedIn", path: "https://linkedin.com" },
  ],
}

export default footerLinks
