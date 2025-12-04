import { create } from "zustand";
import { ConversationViewModelState } from "./ConversationState";
import { fetchConversations } from "../../data/service/ChatService";
import { useAuthViewModel } from "../auth/AuthViewModel";
import { mapConversationToChatItem } from "../../data/model/chat/ConversationMapper";

export const useConversationViewModel = create<ConversationViewModelState>((set) => ({
    conversations: [],
    isLoading: false,
    error: null,

    getConversations: async () => {
        try {
            set({isLoading: true, error: null});

            const response = await fetchConversations();

            const currentUser = useAuthViewModel.getState().user;

            const mapped = response.data.map((c) =>  mapConversationToChatItem(c, currentUser!.id));

            set({
                conversations: mapped,
                isLoading: false,
            });

            return mapped;
        } catch (err: any) {
            console.log("Conversation Error:", err.response?.data || err.message);
            set({
                error: err.response?.data?.message || "Conversation fetch failed",
                isLoading: false,
            });
            return null;
        }
    }
}))