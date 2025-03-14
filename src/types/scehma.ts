import { z } from 'zod';

export const addTaskSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters' }),
  description: z.string().min(5, { message: 'Description must be at least 5 characters' }),
  priority: z.enum(['low', 'medium', 'high'], {
    message: 'Priority must be "low", "medium" or "high"',
  }),
  project: z.string({ message: 'should be select at least one item' }),
});

// Define type using z.infer
export type addTaskSchemaType = z.infer<typeof addTaskSchema>;

// // If you want to type for individual properties
// export type TaskTitle = z.infer<typeof addTaskSchema.shape.title>;
// export type TaskDescription = z.infer<typeof addTaskSchema.shape.description>;
// export type TaskPriority = z.infer<typeof addTaskSchema.shape.priority>;
// export type TaskProject = z.infer<typeof addTaskSchema.shape.project>;
