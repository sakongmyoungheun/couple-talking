import torch
from transformers import GPT2LMHeadModel, PreTrainedTokenizerFast
from fastapi import HTTPException

tokenizer = PreTrainedTokenizerFast.from_pretrained("skt/kogpt2-base-v2",
                                                    bos_token='</s>',
                                                    eos_token='</s>',
                                                    unk_token='<unk>',
                                                    pad_token='<pad>',
                                                    mask_token='<mask>')

# 2개 모델로 돌리고
# 하나만 있어서 일단 같은 파일로 했음
# map_location=torch.device('cpu'): cpu로 실행
model_open_obj = GPT2LMHeadModel.from_pretrained("skt/kogpt2-base-v2")
model_open_obj.load_state_dict(torch.load("./model/model_ok.pth", map_location=torch.device('cpu')))
model_open_obj.eval()

model_close_obj = GPT2LMHeadModel.from_pretrained("skt/kogpt2-base-v2")
model_close_obj.load_state_dict(torch.load("./model/model_no.pth", map_location=torch.device('cpu')))
model_close_obj.eval()

def model_open(data):
    try:
        input_ids = tokenizer.encode(data, return_tensors="pt")

        with torch.no_grad():
            output = model_open_obj.generate(input_ids,
                                    max_length=100,
                                    num_return_sequences=1,
                                    no_repeat_ngram_size=2,
                                    top_k=50,
                                    top_p=0.95,
                                    do_sample=True)
            generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
            result_text = generated_text.replace(data, '').strip().split('\n')[1]

        return result_text
    except Exception as e:
        print(e)

def model_close(data):
    # print(data)
    # return "유교 서버에 연결 성공"
    try:
        # 현재 학습된 모델을 불어오면 500
        input_ids = tokenizer.encode(data, return_tensors="pt")
        output = model_close_obj.generate(input_ids,
                                max_length=100,
                                num_return_sequences=1,
                                no_repeat_ngram_size=2,
                                top_k=50,
                                top_p=0.95,
                                do_sample=True)
        generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
        result_text = generated_text.replace(data, '').strip().split('\n')[1]

        return result_text
    except Exception as e:
        print(e)


