export interface Certification {
  title: string;
  issuer: string;
  files?: { label: string; href: string }[];
  verifyUrl?: string;
}

export const certifications: Certification[] = [
  {
    title: "CCNA",
    issuer: "Cisco",
    files: [
      { label: "Introduction to Networks", href: "/certificates/ccna-1-introduction-to-networks.pdf" },
      { label: "Switching, Routing & Wireless Essentials", href: "/certificates/ccna-2-switching-routing-wireless.pdf" },
      { label: "Enterprise Networking, Security & Automation", href: "/certificates/ccna-3-enterprise-networking-security.pdf" },
    ],
  },
  {
    title: "Python Essentials 1 & 2",
    issuer: "Cisco",
    files: [
      { label: "Python Essentials 1", href: "/certificates/python-essentials-1.pdf" },
      { label: "Python Essentials 2", href: "/certificates/python-essentials-2.pdf" },
    ],
  },
  { title: "OCI Generative AI Professional", issuer: "Oracle" },
  {
    title: "Google AI Essentials",
    issuer: "Google / Coursera",
    verifyUrl: "https://www.coursera.org/account/accomplishments/verify/WQC7KJL8DXM8",
  },
  { title: "Applied AI", issuer: "Cisco", files: [{ label: "Certificate", href: "/certificates/applied-ai-cisco.pdf" }] },
  {
    title: "Modern AI Practitioner",
    issuer: "Cisco",
    files: [{ label: "Certificate", href: "/certificates/modern-ai-cisco.pdf" }],
  },
  { title: "Data Science", issuer: "Cisco", files: [{ label: "Certificate", href: "/certificates/data-science-cisco.pdf" }] },
  {
    title: "Cloud Computing",
    issuer: "Cisco",
    files: [{ label: "Certificate", href: "/certificates/cloud-computing-cisco.pdf" }],
  },
];
