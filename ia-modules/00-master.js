import { PERSONA_INSTRUCTION } from './01-persona.js';
import { KNOWLEDGE_BASE } from './02-knowledge-base.js';
import { CONVERSATION_FLOW_INSTRUCTION } from './03-conversation-flow.js';
import { RULES_INSTRUCTION } from './04-rules.js';
import { LEAD_HANDLING_INSTRUCTION } from './05-lead-handling.js';

export const MASTER_SYSTEM_INSTRUCTION = `
${PERSONA_INSTRUCTION}

${KNOWLEDGE_BASE}

${CONVERSATION_FLOW_INSTRUCTION}

${RULES_INSTRUCTION}

${LEAD_HANDLING_INSTRUCTION}
`;
