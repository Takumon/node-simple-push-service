
/*
private static void minimizeAllApplications(Robot robot) {
    String osName = System.getProperty("os.name");

    if (osName.startsWith("Mac OS X")) {
      Point location = MouseInfo.getPointerInfo().getLocation();
      Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();

      // 画面の右下の端をクリックし、最前面ではないアプリを全て最小化
      click(robot, screenSize.width - 1, screenSize.height - 1);
      pressKeys(robot, KeyEvent.VK_ALT, KeyEvent.VK_META, KeyEvent.VK_H); // option + command + h

      // 画面の右下端にアプリがある場合を考慮し、画面の左下の端をクリックし、最前面ではないアプリを全て最小化
      click(robot, 0, screenSize.height - 1);
      pressKeys(robot, KeyEvent.VK_ALT, KeyEvent.VK_META, KeyEvent.VK_H); // option + command + h

      // マウスのカーソルを元の位置に戻す
      robot.mouseMove(location.x, location.y);
    } else if (osName.startsWith("Windows")) {
      pressKeys(robot, KeyEvent.VK_WINDOWS, KeyEvent.VK_M); // windows key + m
    } else {
      System.err.println("Not tested on " + osName);
    }
  }

  private static void click(Robot robot, int x, int y) {
    robot.mouseMove(x, y);
    robot.mousePress(InputEvent.BUTTON1_MASK);
    robot.mouseRelease(InputEvent.BUTTON1_MASK);
  }

  private static void pressKeys(Robot robot, int... keys) {
    for (int key : keys) {
      robot.keyPress(key);
    }
    robot.delay(10);
    for (int i = keys.length - 1; i >= 0; i--) {
      robot.keyRelease(keys[i]);
    }
  }

  private static void openWebBrowser(String url) {
    try {
      Desktop.getDesktop().browse(new URI(url));
    } catch (Exception e) {
      System.err.println(e.getMessage());
    }
  }
*/
const robot = require("robotjs");
const puppeteer = require('puppeteer');



const minimizeAllApplications = () => {
  const screenSize = robot.getScreenSize()
  // pressKeys(['command', 'w'])
  click(screenSize.width - 1, screenSize.height - 1);
  pressKeys(['alt', 'command', 'h']); // option + command + h
}

const click = (x, y) => {
  robot.moveMouse(x, y);
  robot.mouseClick();
}

const pressKeys = (keys) => {
  keys.forEach(key => robot.keyToggle(key,'down'));
  robot.setKeyboardDelay(10)
  keys.forEach(key => robot.keyToggle(key,'up'));
}

const openWebBrowser = async (url) => {
    const browser = await puppeteer.launch({headless: false});
    const pages = await browser.pages()
    await pages[0].goto(url);
};


// openWebBrowser('https://example.com');
minimizeAllApplications()