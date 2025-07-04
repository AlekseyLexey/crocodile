export enum CLIENT_ROUTES {
  MAIN = "/",
  SIGN_IN = "/signin",
  SIGN_UP = "/signup",
  GAME = "/game",
  GAME_TEST = "/game-test",
  LOBBY_LIST = "/lobbies",
  SHOP = "/shop",
  PROFILE = "/profile",
  RULES = "/rules"
}

export enum SOCKET_DRAW_ROUTES {
  DRAW = "draw",
  PENCIL = "pencil",
  FILL = "fill",
  FINISH = "finish",
  CLEAR = "clear",
  COLOR = "color",
}

export enum SOCKET_ROOM_ROUTES {
  JOIN_ROOM = "joinRoom",
  ROOM = "room",
  EXIT_ROOM = "exitRoom",
}

export enum SOCKET_STATUS_ROUTES {
  START = "startGame",
  PAUSE = "pauseGame",
  END = "endGame",
}

export enum SOCKET_CHAT_ROUTES {
  NEW_MESSAGE = "newMessage",
  SEND_MESSAGE = "sendMessage",
}

export enum SOCKET_WORD_ROUTES {
  CHOOSE_THEME = "chooseTheme",
  NEW_WORD = "newWord",
  CORRECT_WORD = "correctWord",
  GET_WORD = "getWord",
}
