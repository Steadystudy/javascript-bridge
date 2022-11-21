const MissionUtils = require('@woowacourse/mission-utils');
const BridgeMaker = require('./BridgeMaker');
const BridgeGame = require('./BridgeGame');
const BridgeRandomNumberGenerator = require('./BridgeRandomNumberGenerator');
const Constants = require('./Constants');

/**
 * 사용자로부터 입력을 받는 역할을 한다.
 * - 제공된 `InputView` 객체를 활용해 구현해야 한다.
- `InputView`의 파일 경로는 변경할 수 있다.
- `InputView`의 메서드의 인자는 변경할 수 있다.
- 사용자 값 입력을 위해 필요한 메서드를 추가할 수 있다.
 */
let game;

const InputView = {
  /**
   * 다리의 길이를 입력받는다.
   */
  readBridgeSize() {
    MissionUtils.Console.readLine(Constants.Input.bridgeSize, (size) => {
      const bridge = BridgeMaker.makeBridge(size, BridgeRandomNumberGenerator.generate);
      game = new BridgeGame(bridge);
      InputView.readMoving();
    });
  },

  /**
   * 사용자가 이동할 칸을 입력받는다.
   */
  readMoving() {
    MissionUtils.Console.readLine(Constants.Input.move, (movement) => {
      const moveResult = game.move(movement);
      InputView.readMoveResult(moveResult);
    });
  },
  /**
   * 사용자가 이동한 결과 값을 받는다.
   */
  readMoveResult(moveResult) {
    switch (moveResult) {
      case 'success':
        return InputView.readMoving();
      case 'fail':
        return InputView.readGameCommand();
      case 'done':
        return; // 최종 결과 내보내기
    }
  },

  /**
   * 사용자가 게임을 다시 시도할지 종료할지 여부를 입력받는다.
   */
  readGameCommand() {},
};

module.exports = InputView;
