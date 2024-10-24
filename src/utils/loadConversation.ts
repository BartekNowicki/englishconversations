export const conversationModules = import.meta.glob('../assets/conversations/*.ts');

export interface ConversationModule {
  [key: string]: any;
  clickables: string[];
  clickablesPl: string[];
  title: string;
  discussionQuestions: string[];
  conversation: any[];
  definitions: string[];
}

/**
 * Loads a conversation based on the given id.
 * @param id - The id of the conversation to load.
 * @returns An object containing the conversation data.
 */
export const loadConversationById = async (id: string) => {
  const matchedFilePath = Object.keys(conversationModules).find((filePath) => {
      const fileName = filePath.split('/').pop()?.replace('.ts', '');
      return fileName?.startsWith(id);
    });

  if (!matchedFilePath) {
    throw new Error(`No conversation found for this ID: ${id}`);
  }

  try {
    const module = (await conversationModules[matchedFilePath]()) as ConversationModule;
    console.log("loaded clickables: ", module.clickables)///
    return {
      conversation: module.conversation,
      clickables: module.clickables,
      clickablesPl: module.clickablesPl,
      title: module.title,
      discussionQuestions: module.discussionQuestions || [],
      definitions: module.definitions || [],
      clickablesDistractors: module.clickablesDistractors || [],
    };
  } catch (error) {
    console.error(`Error loading conversation for ID ${id}:`, error);
    throw error;
  }
};
