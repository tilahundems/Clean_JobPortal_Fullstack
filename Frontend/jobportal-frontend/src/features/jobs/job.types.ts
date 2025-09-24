export interface JobDto {
  id: string;
  title: string;
  description: string;
  location?: string;
  postedDate: string;
  expiryDate?: string;
  postedById?: string;
}
