import { Href, Redirect } from "expo-router";

import { routes } from "@/src/navigation/routes";
import { useFortu } from "@/src/state/store";

export default function Index() {
  const { state } = useFortu();
  return <Redirect href={(state.user ? routes.home : routes.login) as Href} />;
}
