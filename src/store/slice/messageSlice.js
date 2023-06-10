import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPostMessage = createAsyncThunk(
  "message/fetchPostMessage",
  async function (info, { dispatch }) {
    const response = await fetch(
      `https://api.green-api.com/waInstance${info.idInstance}/sendMessage/${info.token}/`,
      {
        method: "POST",
        body: JSON.stringify({
          chatId: `${info.tel}@c.us`,
          message: `${info.text}`,
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    if (!response.ok) {
      throw new Error("incorrect path");
    }
    dispatch(
      addMessage({
        textMessage: info.text,
        typeMessage: "sendMessage",
      })
    );
  }
);

export const fetchDeleteMessage = createAsyncThunk(
  "message/fetchDeleteMessage",
  async function (info, { rejectWithValue }) {
    if (info.receiptId) {
      try {
        var requestOptions = {
          method: "DELETE",
          redirect: "follow",
        };

        const response = await fetch(
          `https://api.green-api.com/waInstance${info.idInstance}/deleteNotification/${info.token}/${info.receiptId}`,
          requestOptions
        );

        if (!response.ok) {
          throw new Error("incorrect path");
        }
      } catch (error) {
        return rejectWithValue(error.message);
      }
    } else {
      return;
    }
  }
);

export const fetchGetMessage = createAsyncThunk(
  "message/fetchGetMessage",
  async function (info, { dispatch }) {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const data = await fetch(
      `https://api.green-api.com/waInstance${info.id}/receiveNotification/${info.token}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(
          fetchDeleteMessage({
            idInstance: info.id,
            token: info.token,
            receiptId: data.receiptId,
          })
        );
        return data;
      })
      .catch((error) => console.log(error));
    return data;
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
    receiptId: null,
    status: null,
    error: null,
  },
  reducers: {
    addMessage(state, action) {
      state.messages.push({
        textMessage: action.payload.textMessage,
        typeMessage: action.payload.typeMessage,
      });
    },
  },
  extraReducers: {
    [fetchGetMessage.pending]: (state, action) => {
      state.status = "Loading";
      state.error = null;
    },
    [fetchGetMessage.fulfilled]: (state, action) => {
      state.status = "resolved";

      if (action.payload) {
        state.messages.push({
          textMessage:
            action.payload.body.messageData.textMessageData.textMessage,
          typeMessage: action.payload.body.typeWebhook,
        });

        state.receiptId = action.payload.receiptId;
      }
    },
    [fetchGetMessage.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    [fetchDeleteMessage.fulfilled]: (state, action) => {
      state.receiptId = null;
    },
  },
});

export const { addMessage } = messageSlice.actions;

export default messageSlice.reducer;
