import { AuthorProfile } from "@/features/author/components/AuthorProfile";

export default function AuthorPage({ params }: { params: { id: string } }) {
  return (
    <AuthorProfile authorId={params.id} />
  );
}
