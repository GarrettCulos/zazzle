/**
 * Typescript Type and this type are intentionally different
 * This file has differences
 *  - userId
 */

export default `
    type Project {
        id: String!
        user: User!
        likedBy: [User]
        followCount: Int
        projectType: String!
        title: String!
        description: String!
        startDate: Date
        endDate: Date
        createdAt: Date
        updatedAt: Date
        coverImages: [String]
        tags: [String]
        collaborators: [User]
        location: String
        posts: [Post]
        event: String
        metrics: [Metric]
        metricTemplates: [MetricTemplate]
    }
`;