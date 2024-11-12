import { Application } from "../declarations";
import clue from "./clue/clue.service";
import stats from "./stats/stats.service";
import salt from "./salt/salt.service";
import commitment from "./commitment/commitment.service";
import saltStorage from "./salt-storage/salt-storage.service";
import gameRound from "./game-round/game-round.service";
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(clue);
  app.configure(stats);
  app.configure(salt);
  app.configure(commitment);
  app.configure(saltStorage);
  app.configure(gameRound);
}
