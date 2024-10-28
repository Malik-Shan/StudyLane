import { defineCollection, reference, z } from "astro:content";

const libraryCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      thumbnail: z.object({
        img: image(),
        position: z.enum([
          "left-top",
          "top",
          "right-top",
          "left",
          "center",
          "right",
          "left-bottom",
          "bottom",
          "right-bottom",
        ]),
        alt: z.string(),
      }),
      name: z.string(),
      edition: z.number().min(1).max(50),
      category: z.string(),
      drive_id: z.string(),
      author: z.array(z.string()),
    }),
});
const subjectsCollection = defineCollection({
  type: "data",
  schema: z.object({
    draft: z.boolean(),
    name: z.string(),
    code: z.string(),
    credit_hours: z
      .object({
        discriminant: z.boolean(),
        value: z.string().optional(),
      })
      .refine(
        (obj) => (
          obj.discriminant === true ? obj.value !== undefined : true,
          {
            message: "Credit Hour must be provided if discriminant is true.",
          }
        ),
      ),
    outline: z.array(
      z.object({
        topic: z.string(),
        data: z
          .object({
            discriminant: z.boolean(),
            value: z.union([
              z
                .array(
                  z.object({
                    topic: z.string(),
                    taught: z.boolean(),
                  }),
                )
                .optional(),
              z
                .object({
                  taught: z.boolean(),
                })
                .optional(),
            ]),
          })
          .refine(
            (data) => {
              if (data.discriminant) {
                return Array.isArray(data.value);
              } else {
                return typeof data.value === "object" && "taught" in data.value;
              }
            },
            {
              message: "Invalid value for outline regarding discriminant.",
            },
          ),
      }),
    ),
    reference_materials: z.array(reference("library")),
  }),
});
const coursesCollection = defineCollection({
  type: "content",
  schema: z.object({
    draft: z.boolean(),
    abbreviation: z.string(),
    name: z.string(),
    information: z.object({
      type: z.string(),
      exam_system: z.string(),
      duration: z.number(),
      eligibility: z.string(),
    }),
    course_section: z.array(reference("course_sections")),
  }),
});
const courseSectionsCollection = defineCollection({
  type: "data",
  schema: z.object({
    draft: z.boolean(),
    section_type: z.string(),
    section_part: z.number().min(1).max(10),
    course_section: z.string(),
    subjects: z.array(reference("subjects")),
    schedule: z.array(
      z.object({
        subject: reference("subjects"),
        time: z.string(),
        faculty: reference("faculty"),
      }),
    ),
  }),
});
const noticeboardCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      draft: z.boolean(),
      title: z.string(),
      published: z.date(),
      bannerImg: z.object({
        image: image(),
        alt: z.string(),
      }),
      category: z.array(z.string()).default([]),
      tag: z.array(z.string()),
      postedBy: z.string().default("Admin"),
    }),
});
const facultyCollection = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      draft: z.boolean(),
      profile: z.object({
        image: image(),
        alt: z.string(),
      }),
      name: z.string(),
      info: z.object({
        contact: z.string(),
        email: z.string().email(),
        qualification: z.array(z.string()),
        designation: z.array(reference("designations")),
      }),
    }),
});
const designationsCollection = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    description: z.string().default(""),
  }),
});
const navigationCollection = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    navigation: z.array(
      z.object({
        name: z.string(),
        href: z.string(),
        icon: z.string(),
      }),
    ),
  }),
});

export const collections = {
  library: libraryCollection,
  subjects: subjectsCollection,
  courses: coursesCollection,
  course_sections: courseSectionsCollection,
  noticeboard: noticeboardCollection,
  faculty: facultyCollection,
  designations: designationsCollection,
  navigation: navigationCollection,
};
