import { redirect } from "next/navigation";
import { WAITLIST_PATH } from "@/lib/constants";

// The apps aren't open to the public yet: old install links go to the waitlist.
export default function InstallPage() {
  redirect(WAITLIST_PATH);
}
