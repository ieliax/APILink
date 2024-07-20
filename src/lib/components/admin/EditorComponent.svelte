<script>
    import UiCustomInput from "../UIKit/UICustomInput.svelte";
    import UiCustomTextarea from "../UIKit/UICustomTextarea.svelte";
    import { name, description, instruction } from "../../stores/adminStore";

</script>

<div class="editor">
    <div class="editor__container">
        <div class="editor__top"></div>
        <div class="editor__center">
            <div class="imgcontent">
                <img
                    src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/640px-Starbucks_Corporation_Logo_2011.svg.png"
                    alt=""
                />
            </div>
            <UiCustomInput
                id="name"
                labelname="Name"
                inputdescription="Name yout GPT"
                storeValue={name}
            />
            <UiCustomInput
                id="description"
                labelname="Description"
                inputdescription="Add a short description about what this GPT does"
                storeValue={description}
            />
            <UiCustomTextarea
                id="instruction"
                labelname="Instructions"
                inputdescription="Que hace tu GPT"
                storeValue={instruction}
            />
        </div>
        <div class="editor__bottom"></div>
    </div>
</div>

<style>
    * {
        font-family: Arial, Helvetica, sans-serif;
        caret-color: white;
    }
    .editor__container {
        display: grid;
        grid-template-rows: 0.1fr auto 0.1fr;
        height: 92vh;
    }
    .editor__top {
        position: sticky;
        top: 0;
        height: 50px;
    }
    .editor__center {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin: 20px;
        color: white;
        overflow-y: auto;
    }
    .editor__center .imgcontent {
        display: flex;
        width: 100%;
        /* background-color: royalblue; */
        justify-content: center;
    }
    .editor__center img {
        width: 80px;
        height: 80px;
        /* background-color: red; */
    }
    .editor__center label {
        font-size: 14px;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 600;
    }

    .textareaContainer {
        display: grid;
        grid-template-rows: 1fr 0.1fr;
        height: 150px;
        /* background-color: red; */
    }
    .textareaContainer_content {
        display: flex;
        width: 99%;
        gap: 10px;
        flex-direction: column;
    }
    .textareaContainer_content > textarea {
        height: 100%;
        resize: none;
        background-color: transparent;
        border: 1px solid #424242;
        border-radius: 10px;
        padding: 15px;
        outline: none;
    }
    .textareaContainer > button {
        position: sticky;
        width: 30px;
    }
</style>
