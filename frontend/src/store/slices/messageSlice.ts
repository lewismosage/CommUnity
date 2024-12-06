import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MessageService } from '../../services/messageService';

interface MessageState {
  conversations: any[];
  selectedConversation: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: MessageState = {
  conversations: [],
  selectedConversation: null,
  loading: false,
  error: null,
};

export const fetchConversations = createAsyncThunk(
  'messages/fetchConversations',
  async () => {
    return await MessageService.getConversations();
  }
);

export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async ({ conversationId, content }: { conversationId: string; content: string }) => {
    return await MessageService.sendMessage(conversationId, content);
  }
);

export const startConversation = createAsyncThunk(
  'messages/startConversation',
  async (userId: string) => {
    return await MessageService.createConversation(userId);
  }
);

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    selectConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
    addMessage: (state, action) => {
      const { conversationId, message } = action.payload;
      const conversation = state.conversations.find(c => c.id === conversationId);
      if (conversation) {
        conversation.messages.push(message);
      }
      if (state.selectedConversation?.id === conversationId) {
        state.selectedConversation.messages.push(message);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch conversations';
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const conversation = state.conversations.find(
          c => c.id === action.payload.conversationId
        );
        if (conversation) {
          conversation.messages.push(action.payload);
        }
        if (state.selectedConversation?.id === action.payload.conversationId) {
          state.selectedConversation.messages.push(action.payload);
        }
      })
      .addCase(startConversation.fulfilled, (state, action) => {
        state.conversations.unshift(action.payload);
        state.selectedConversation = action.payload;
      });
  },
});

export const { selectConversation, addMessage } = messageSlice.actions;
export default messageSlice.reducer; 