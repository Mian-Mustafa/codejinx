/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: blogposts
 * Interface for BlogPosts
 */
export interface BlogPosts {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  slug?: string;
  /** @wixFieldType image */
  featuredImage?: string;
  /** @wixFieldType text */
  excerpt?: string;
  /** @wixFieldType text */
  content?: string;
  /** @wixFieldType text */
  author?: string;
  /** @wixFieldType datetime */
  publicationDate?: Date | string;
  /** @wixFieldType text */
  seoDescription?: string;
}


/**
 * Collection ID: portfolioprojects
 * Interface for PortfolioProjects
 */
export interface PortfolioProjects {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  projectName?: string;
  /** @wixFieldType text */
  projectDescription?: string;
  /** @wixFieldType text */
  discipline?: string;
  /** @wixFieldType text */
  serviceType?: string;
  /** @wixFieldType text */
  skillCategory?: string;
  /** @wixFieldType text */
  specializedTerminology?: string;
  /** @wixFieldType text */
  skillHighlights?: string;
  /** @wixFieldType url */
  projectUrl?: string;
  /** @wixFieldType image */
  thumbnailImage?: string;
  /** @wixFieldType date */
  completionDate?: Date | string;
}


/**
 * Collection ID: services
 * Interface for Services
 */
export interface Services {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  serviceName?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  detailedDescription?: string;
  /** @wixFieldType text */
  industryContext?: string;
  /** @wixFieldType text */
  transferableSkills?: string;
  /** @wixFieldType image */
  serviceImage?: string;
  /** @wixFieldType url */
  callToActionUrl?: string;
}
