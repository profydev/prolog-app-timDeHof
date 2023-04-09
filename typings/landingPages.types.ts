export type TLandingPage = {
  meta: {
    title: string;
    description: string;
    image: string;
  };
  sections: Section[];
};

export enum SectionTypes {
  hero = "hero",
  socialProof = "social-proof",
  testimonials = "testimonials",
}
export type BackgroundTheme = "light-gray" | "light";
export type Section = SectionHero | SectionSocialProof | SectionTestimonials;

export type SectionHero = {
  sectionType: SectionTypes.hero;
  theme: BackgroundTheme;
  title: string;
  subtitle: string;
  image: {
    src: string;
    width: number;
    height: number;
  };
};

export type SectionSocialProof = {
  sectionType: SectionTypes.socialProof;
  theme: BackgroundTheme;
  title: string;
  companies: Companies[];
};

export type Companies = {
  name: string;
  logo: string;
};

export type SectionTestimonials = {
  sectionType: SectionTypes.testimonials;
  theme: BackgroundTheme;
  title: string;
  subtitle: string;
  testimonials: Testimonials[];
};

export type Testimonials = {
  title: string;
  text: string;
  userName: string;
  userRole: string;
  userCompany: string;
  userImage: {
    src: string;
    width: number;
    height: number;
  };
};
