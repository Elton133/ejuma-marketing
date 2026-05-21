import { redirect } from "next/navigation";
import { WAITLIST_PATH } from "@/lib/research-questions";

export default function ResearchRolePage() {
  redirect(WAITLIST_PATH);
}
