<template>
  <div class="pdf">
    <button class="btn" @clck="createPDF">Create PDF</button>
  </div>

</template>

<script>

  import jsPDF from 'jspdf'

  export default {
    name: 'pdf',
    data() {
      return {


      }
    },
    methods: {
      createPDF() {
        var pdf = new jsPDF();
        pdf.fromHTML(document.getElementById("app"), 20, 20,{'width':500});
        pdf.save('grant.pdf')
      }

    }
  }



</script>

HTML Excerpt
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
</head>

<body>
<div id="app" ref="appPDF">
  <table>
    <tr>
      <td>Department</td>
      <td></td>
      <td>Memorandum</td>     
    </tr>
    <tr>
      <td>Date:</td>
      <td></td>
      <td></td>     
    </tr>

    <tr>
      <td>From:</td>
      <td>John Doe Assistant </td>
      <td></td>     
    </tr>
    <tr>
