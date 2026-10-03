import { Href, Redirect, useLocalSearchParams } from "expo-router";

import { PrimaryButton } from "@/src/components/Buttons";
import { FortuSay } from "@/src/components/Fortu";
import { ScreenShell } from "@/src/components/ScreenShell";
import { screens, selfQuestions } from "@/src/content";
import { ui } from "@/src/content/ui";
import { go, parseIndex, routes } from "@/src/navigation/routes";
import { selfAnsweredCount } from "@/src/state/selectors";
import { useFortu } from "@/src/state/store";

/** Hint after each answer — dark transit screen, does not advance progress. */
export default function SelfHint() {
  const { i: raw } = useLocalSearchParams<{ i: string }>();
  const i = parseIndex(raw, selfQuestions.length - 1);
  const { state, setSelfIdx, completeSelf } = useFortu();

  if (i === null) return <Redirect href={routes.selfIntro as Href} />;
  if (state.self.answers[i] === null) return <Redirect href={routes.selfQ(i) as Href} />;
  const last = i === selfQuestions.length - 1;

  const onContinue = () => {
    if (!last) {
      setSelfIdx(i + 1);
      go(routes.selfQ(i + 1));
    } else {
      completeSelf();
      go(routes.selfResult("flow"));
    }
  };

  return (
    <ScreenShell
      testID="self-hint-screen"
      variant="dark"
      title={ui.titles.self}
      screenLabel={ui.screenLabels.hint}
      onBack={() => go(routes.selfQ(i))}
      progress={{ done: selfAnsweredCount(state), total: selfQuestions.length, current: i + 1, label: ui.questionProgress(i + 1) }}
      center
      footer={<PrimaryButton testID="self-hint-continue-button" label={screens.tulemus.nupp} onPress={onContinue} />}
    >
      <FortuSay text={selfQuestions[i].hint} dark big testID="self-hint-text" />
    </ScreenShell>
  );
}
