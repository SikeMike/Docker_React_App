import { ChatGPTUnofficialProxyAPI } from "chatgpt";
import { oraPromise } from 'ora';
import fetch from 'node-fetch';



class QuestionGenerator {
  constructor() {
    this.qTypes = {
      "multiple": `Give me a multiple cohice question with several correct options, topic: how to do a Docker deployment. follow the next template:
      { "question": "",
      "options": [
        {"option": "A", "text": ""},
        {"option": "B", "text": ""},
        {"option": "C", "text": ""},
        {"option": "D", "text": ""},
        {"option": "E", "text": ""},
        {"option": "F", "text": ""}
      ],
      "answers": [
        //here put one or more correct answers, just the index of the correct options
      ]
    }
      No additional text`,

      "single": `Give me a multiple cohice question, topic: how to do a Docker deployment. follow the next template:
      { "question": "",
      "options": [
        {"option": "A", "text": ""},
        {"option": "B", "text": ""},
        {"option": "C", "text": ""},
        {"option": "D", "text": ""}
      ],
      "answer": //the index of the correct answer
    }
      No additional text`,

      "written": `Give me a free text question which has short text as answer, topic: things realted to how a Docker deployment is done. display it on json format. No additional text`,

      "gaps": `Give me a statement with gaps to fill as in an exam, topic: how to do a Docker deployment. follow the next template:
      { "statement": "",
      "answers": [
        //here put the correct asnwer for each gap
      ]
    }
    No additional text`
  };
  this.api = new ChatGPTUnofficialProxyAPI({
    fetch: fetch,
    apiReverseProxyUrl: 'https://gpt.pawan.krd/backend-api/conversation',
    //apiReverseProxyUrl: 'https://ai.fakeopen.com/api/conversation',
    accessToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJ1bmFpc2FyZWhAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWV9LCJodHRwczovL2FwaS5vcGVuYWkuY29tL2F1dGgiOnsidXNlcl9pZCI6InVzZXItdGtueXBScDN3SWJ4eGc1Z3NUUEtsUndNIn0sImlzcyI6Imh0dHBzOi8vYXV0aDAub3BlbmFpLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwMTk5NjQ0NjI1MDU3MDczNjE1MCIsImF1ZCI6WyJodHRwczovL2FwaS5vcGVuYWkuY29tL3YxIiwiaHR0cHM6Ly9vcGVuYWkub3BlbmFpLmF1dGgwYXBwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2ODcxNDcyNzUsImV4cCI6MTY4ODM1Njg3NSwiYXpwIjoiVGRKSWNiZTE2V29USHROOTVueXl3aDVFNHlPbzZJdEciLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIG1vZGVsLnJlYWQgbW9kZWwucmVxdWVzdCBvcmdhbml6YXRpb24ucmVhZCBvcmdhbml6YXRpb24ud3JpdGUifQ.VmWMz9wMeN4Q1sE-q598Yq589jxhoEelEBN7iB5AMaRi7mmGOoRAjG0oCEj9BtF0g_YQkntEAOj1fY4-2MT4HaS9zWM4z0keH_B8Wnt27Wn-r9pPblaBe_DAaYrrGRqJao20yv_aSpLM-jOh2zLqXlhakNrzhzxjNS_8ztPvPCT_Z0RC4XyqOaM_cA6K5Js1fVWVd0YeaQs_BSLSYKRzEGfQiY8ZXB7awA69tiTY6xo3poChTa-_FHiNh_pcr33HXTCuWFvaEexSFTRbaHcs6vZbgjWxkkQ8gs7qQTGFNVKxIOYmZhtaBTDN9b6In1pXAxgMyHBs-8Tca1jcRT0sPA",
    debug:false,
  });
  }


  async getQuestion(questionType) {      
    var q = questionType;
    var prompt = this.qTypes[q];
    
    var res = await this.generateConversation(prompt, this.api);

    var jsonObject = await this.extractJsonObject(res.text);

    console.log(jsonObject);
    return jsonObject;
  }

  extractJsonObject(text) {
    const regex = /\{.*\}/s; // match any characters between the first { and last }
    var jsonString = text.match(regex)[0];
    var jsonObject = JSON.parse(jsonString);
    return jsonObject;
  }

  async generateConversation(prompt, api) {
    let res = await oraPromise(api.sendMessage(prompt), {
      text: prompt
    });
    return res;
  }

  async continueConversation(prompt, api, convId, parentId) {
    let res = await oraPromise(api.sendMessage(prompt, {
      conversationId: convId,
      parentMessageId: parentId
    }), {
      text: prompt
    });
    return res;
  }

  
}

export default async function main(args){
    let g = new QuestionGenerator;
    let q = await g.getQuestion(args);
    //console.log(q);
  }





/*const args = process.argv.slice(2);
main(args);*/