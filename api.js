$(document).ready(function(){
    $.ajax({
        type:"GET",
        dataType: "json",
        url:"https://fe-assignment.vaimo.net/",
        success:function(data)
        {
            $("#product_img").attr("src", data.product.gallery[0].main);
            $("#product_name").prepend(data.product.name);

            //shipping props
            if(!data.product.shipping.props.fast_dispatch) {
                $("#fast_dispatch").css('background-color', '#dfe1e2');
                $("#fast_dispatch").css('color', '#adadad');
                $("#fast_dispatch").text("Unavailable");
            }

            if(!data.product.shipping.props.in_stock) {
                $("#in_stock").css('background-color', '#dfe1e2');
                $("#in_stock").css('color', '#adadad');
                $("#in_stock").text("No Stock");
            }

            if(!data.product.shipping.props.ready_to_ship){ 
                $("#ready_to_ship").css('display', 'none');
            }

            //tag
            $("#label1").append(data.product.tags);

            //reviews
            var stars = "";
            for(i = 0; i < data.product.reviews.rating; i++)
            {
                stars  += '<img src="public/star.png" style="height:12px;">';
            }

            stars += '<bold class="text-orange" style="margin-left:5px"> 5.0 </bold> ';
            stars += data.product.reviews.count + ' Reviews';
            stars += '<bold class="text-dark" style="margin-left:25px"> ' + data.product.reviews.total_buyers + ' buyers </bold>';

            $("#reviews").append(stars);   
            
            //discount
            $("#discount").append(`
                <span class="text-orange">`+ data.product.discount.amount +` OFF</span>
                <span class="text-grey"> Discount ends in</span>
                <span style="margin-left:15px;"> <img src="public/time.png" style="height:10px;"></span>
                <span class="text-grey"> `+ data.product.discount.end_date +`</span>
            `);

            $("#shipping").append(`
                <span class="text-dark" style="font-weight:900; font-size:16px; float:right; margin-top:10px">R 6,036.74</span>
                <p class="text-p text-grey">
                    Ship to <b style="text-decoration: underline">`+ data.product.shipping.method.country +`</b>
                    <br>
                    by <b style="text-decoration: underline">`+ data.product.shipping.method.title +`</b>
                    <br>
                    <br>
                    Lead time `+ data.product.shipping.lead_time.value +`
                    <br>
                    <br>
                    Shipping time `+ data.product.shipping.method.shipping_time.value +`
                </p>
                <center><button type="button" class="btn btn-primary btn-round-lg btn-lg">Login to Purchase</button></center>
                <br>
                <center><button type="button" class="btn btn-secondary btn-round-lg btn-lg"> <img src="public/envelop.png"> Contact the Supplier</button></center>
            `);

            //alert(data.product.gallery[0].main);
            console.log(data);
        }
    });
});

function myFunction() {
    var lastValid = 0;
    $('.quantity').each(function() {
        var elem = $(this);
        elem.val((Math.abs(elem.val())));
        
        elem.data('oldVal', 0);
        var validNumber = new RegExp(/^\d+$/);

        if(elem.val() > 0)
        {
            alert('all good');
        }else {
            elem.val(0);
        }

         
         elem.bind("propertychange change click keyup input paste", function(event) {
        
             if ((elem.data('oldVal') != elem.val())) {
                 
                 
                 console.log(elem.val());

                 if (validNumber.test(elem.val())) {
                    
                     lastValid = elem.val();
                 } else {
                    
                     elem.val(lastValid);
               }


         var validNumber = new RegExp(/^\d+$/);

         if (validNumber.test($(this).val())) {
            console.log('valid');
            lastValid = $(this).val();
         } else {
            console.log('not valid');
             $(this).val(lastValid);
                }
            }
        });
    })
}